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
          let sql = "select  * from cricket_match"
          let [tournament]: any  = await this.connection.write.query(sql);
          
          for(let x of tournament){
            x.venue.country.url= await this.imageURL(x.venue.country.code)
          }
          return this.sendSuccess(res, { data: tournament })
        }
        catch(err){
              console.log(err)
        }
    }

    async imageURL(code){
      let country  = "select * from countries where code = ?" 
      let [countries] = await this.connection.write.query(country ,  [code])
      if(countries && countries[0]?.['imgURl'] !== undefined){
        return countries[0]?.['imgURl']
      }else{
        return ""
      }
    }
    async point_table(req:any, res: any){
        try{
          let sql = "select * from result_table where tou_key = ? limit ? offset ?"
          let [table] : any = await this.connection.write.query(sql , [req.query.tou_key , +req.query.limit , +req.query.offset]);
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

  async fantasy_point(req:any, res: any){
    try{
      let sql = "select * from fantasy_points where match_key = ? limit ? offset ?"
      const {match_key , offset , limit } =  req.query
      let [points]  = await this.connection.write.query(sql , [match_key  , +limit , +offset ]  );
      return this.sendSuccess(res, { data: points })
    }
    catch(err){
          console.log(err)
    }
}


}

