
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";

export class match extends ResponseInterceptor{
    connection : connection
    constructor(){
        super()
        this.connection = new connection()
    }
///  find get Match Data from  database
    async getMatchData(sql : string , limit: number , offset : number){
      try{
        let [tournament]: any  = await this.connection.write.query(sql , [+limit , +offset]);
        let play: any = {}
        for(let x of tournament){
          if(x.venue){
            x.venue.country.url= await this.imageURL(x.venue?.country?.name)
          }
          x.team.a.url =await this.imageURL(x.team?.a?.name)
          x.team.b.url =await this.imageURL(x.team?.b?.name)
          x.start_at = new Date(x.start_at).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
          if(x.play){
            play.live = x?.play?.live;
            play.result = x?.play?.result;
            play.target = x?.play?.target;
            play.innings = x?.play?.innings;
            play.day_number = x?.play?.day_number;
            play.first_batting = x?.play?.first_batting;
            play.innings_order = x?.play?.innings_order;
            play.overs_per_innings = x?.play?.overs_per_innings;
            play.innings['a_1'] = x?.play?.innings['a_1']
            play.innings['b_1'] = x?.play?.innings['b_1']
            delete play.innings['a_1'].partnerships;
            delete play.innings['a_1'].wicket_order;
            delete play.innings['a_1'].balls_breakup;
            delete play.innings['a_1'].batting_order;
            delete play.innings['a_1'].bowling_order;
            delete play.innings['b_1'].partnerships;
            delete play.innings['b_1'].wicket_order;
            delete play.innings['b_1'].balls_breakup;
            delete play.innings['b_1'].batting_order;
            delete play.innings['b_1'].bowling_order;
            x.play = play
          }
        }
        return tournament
      }
      catch(err){
            console.log(err)
      }
    }

  // modified data foe  match Fxitures
    async getMatchFxitures(req: any, res: any){
      try{
        let {limit, offset ,date} = req.query
      //  console.log(limit, offset ,date  , req.query)
        let start_at = new Date(date+' 00:00:01').toISOString()
       let end_at= new Date(date+' 23:59:59').toISOString()
      start_at = start_at.replace("T", " ").slice(0, start_at.length-5)
      end_at = end_at.replace("T", " ").slice(0, end_at.length-5)
      let sql_MatchFxitures = `select match_key, name, short_name, sub_title, status, start_at, metric_group, sport, winner, team, gender, format, toss, play, estimated_end_date, completed_date_approximate, tou_key, tou_name, tou_short_name from cricket_match where tou_key in (SELECT tou_key FROM sport_app.tournament where last_scheduled_match_date >  current_date()) and start_at between '${start_at}' and '${end_at}' order by status desc limit ? offset ?`;
        let matchData = await this.getMatchData(sql_MatchFxitures , limit , offset);
        if(matchData.length > 0){
          this.sendSuccess(res, {data: matchData})
        }
      }catch(err){
        console.error('error while getting fixtues data is:::', err)
        this.sendBadRequest(res, err)
      }
    }
// modified data for  match data
    async get_match(req:any, res: any){
        try{
          let {limit, offset} = req.query
          let sql_get_match = "select * from cricket_match where tou_key in (SELECT tou_key FROM sport_app.tournament where last_scheduled_match_date >  current_date()) order by status desc limit ? offset ?";
          let tournament: any = await this.getMatchData(sql_get_match ,limit , offset);
          if(tournament.length > 0){
            return this.sendSuccess(res, {data: tournament})
          }
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

////////////////////////////////////////////////////////////////////////////////////////////////////






}

