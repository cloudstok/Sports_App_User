import { object } from "joi";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";

export class match extends ResponseInterceptor{
    connection : connection
    constructor(){
        super()
        this.connection = new connection()
    }

    async get_match(req:any, res: any){
        try{
          let sql = "select  * from cricket_match where tou_key in (SELECT tou_key FROM sport_app.tournament where last_scheduled_match_date >  current_date())order by match_key desc limit 15";
          let [tournament]: any  = await this.connection.write.query(sql);
          
          for(let x of tournament){
            x.venue.country.url= await this.imageURL(x.venue.country.name)
            x.team.a.url =await this.imageURL(x.team.a.name)
            x.team.b.url =await this.imageURL(x.team.b.name)
          }
          return this.sendSuccess(res, { data: tournament })
        }
        catch(err){
              console.log(err)
        }
    }
   

    async get_match_tournament(req:any, res: any){
      try{
        let sql = "select match_key,name , short_name, sub_title,  start_at , status , metric_group , winner , gender , data_review , format, toss , format , venue,  team , squad, weather,   umpires ,  estimated_end_date , completed_date_approximate , association from cricket_match where tou_key = ?"
        let [tournament]: any  = await this.connection.write.query(sql , [req.query.tou_key]);
        
        for(let x of tournament){
          x.venue.country.url= await this.imageURL(x.venue.country.code)
          x.start_at = x.start_at.toLocaleString();
          if(x.squad){
            x.squad  = Object.values(x?.squad) || []
          }
        }
        return this.sendSuccess(res, { data: tournament })
      }
      catch(err){
            console.log(err)
      }
  }
    async imageURL(code){
      let country  = "select * from countries where name = ? " 
      let [countries] = await this.connection.write.query(country ,  [code])
      if(countries && countries[0]?.['imgURl'] !== undefined){
        return countries[0]?.['imgURl']
      }else{
        return ""
      }
    }
    async point_table(req:any, res: any){
        try{
          let sql = "select * from result_table where tou_key = ?"
          let [table] : any = await this.connection.write.query(sql , [req.query.tou_key , +req.query.limit , +req.query.offset]);
        // console.log(table)
          table[0].rounds = JSON.parse(table[0].rounds)
            for(let x of table){
              for(let y of x.rounds){
                for(let z of y.groups){
                  for(let w of z.points){
                    w.team.imageURL = await this.imageURL(w.team.code) 
                  
                  }
              
                }
              }
            }

          return this.sendSuccess(res, { data: table })
        }
        catch(err){
              console.log(err)
        }
    }

    async fantasy_match_point(req:any, res: any){
      try{
        let sql = "select  * from fantasy"
        let [fantasy]  = await this.connection.write.query(sql);
        return this.sendSuccess(res, { data: fantasy })
      }
      catch(err){
            console.log(err)
      }
  }
  async player(p_key){
    try{
      let sql = "SELECT player_name ,image ,nationality FROM sport_app.players where player_key = ?";
      const[player] = await this.connection.write.query(sql , [p_key])
      return player

    }catch(err){
      console.error(err)
    }
  }

  async fantasy_point(req:any, res: any){
    try{
      let sql = "select * from fantasy_points where match_key = ? limit ? offset ?"
      const {match_key , offset , limit } =  req.query
      let [points]: any  = await this.connection.write.query(sql , [match_key  , +limit , +offset ]  );
      for(let x of points){
            let p = await this.player(x?.player_key);
            x.player_image = p[0]?.image
            x.player_name = p[0]?.player_name
            x.nationality = p[0]?.nationality
      }

      return this.sendSuccess(res, { data: points })
    }
    catch(err){
          console.log(err)
    }
}




}

