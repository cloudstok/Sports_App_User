import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { match } from "./match.controller";
// const vinay = "https://jaunpur123.s3.ap-south-1.amazonaws.com/1697093979829_vinay.jpeg"
export class tournament extends ResponseInterceptor {
  connection: connection
  constructor() {
    super()
    this.connection = new connection()
  }

  async get_tournament(req: any, res: any) {
    try {
      let sql = "select  * from tournament where last_scheduled_match_date >  current_date() order by start_date desc"
      let [tournament] = await this.connection.write.query(sql);
      return this.sendSuccess(res, { data: tournament })
    }
    catch (err) {
      console.log(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async imageURL(code) {
    let country = "select * from countries where code = ? "
    let [countries] = await this.connection.write.query(country, [code])
    if (countries && countries[0]?.['imgURl'] !== undefined) {
      return countries[0]?.['imgURl']
    } else {
      return ""
    }
  }


  // 

  async playerImage(player_key) {
    try {
      let sql = "select  image from players where player_key = ?"
      let [image]: any = await this.connection.write.query(sql, [player_key]);
   
      return image[0]?.image
    }
    catch (err) {
      console.log(err)
    }
  }


  async createTeam(t, p) {
   
    try {
      t = Object.values(t)
      t = [...new Map(t.map(item=> [item['key'], item])).values()]
      p = Object.values(p)
      p = p.map(e => (
        { key: e.key, name: e.name, role: e.roles, nationality: e.nationality }))
      p = [...new Map(p.map(item=> [item['key'], item])).values()]
      let w = []
      for (let x of t) {
        let sp = {
          bt : [],
          bo : [],
          ar : [],
          wc : []
        }
        // x.image = await this.imageURL(x.code)
        for (let y of p) {
          y.image  = await this.playerImage(y.key) || process.env.vinay
          if (x.country_code === y.nationality.code) {
            if(y.role[0] === "batsman"){
              sp.bt.push(y)
            }if(y.role[0]==="all_rounder"){
              sp.ar.push(y)
            }if(y.role[0] === "bowler"){
              sp.bo.push(y)
            }
            if(y.role[0] === "keeper"){
              sp.wc.push(y)
            }
          }
        }
        x.players = sp
        w.push(x)
      }
      return w
    } catch (err) {
      console.log(err)
    }
  }


  async getTournamentById(req: any, res: any) {
    try {
      let sql = "select * from tournament as tr inner join cricket_match as cm on cm.tou_key = tr.tou_key  where tr.tou_key = ?"
      let [tournament]: any = await this.connection.write.query(sql, [req.params.tou_key]);
      let finalData = {};
      let matchData = []
      let teams = [];
      let players = [];
      // let teams: any;
      for (let element of tournament) {
        finalData['tournamentKey'] = element?.tou_key ?? "",
          finalData['tournamentName'] = element?.tou_name ?? ""
        finalData['shortName'] = element?.short_name ?? "",
          finalData['countries'] = element?.countries ?? ""
        finalData['startDate'] = new Date(element.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
          finalData['gender'] = element?.gender ?? "",
          finalData['pointSystem'] = element?.point_system ?? ""
        finalData['competition'] = element?.competition ?? "",
          finalData['associationKey'] = element?.association_key ?? "",
          finalData['sport'] = element?.sport ?? "",
          finalData['isDateConfirmed'] = element?.is_date_confirmed ?? "",
          finalData['isVenueConfirmed'] = element?.is_venue_confirmed ?? "",
          finalData['lastScheduledMatchDate'] = new Date(element?.last_scheduled_match_date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
          finalData['formats'] = element?.formats,
          finalData['teamsDetails'] = {
            // teams: Object.values(element?.teams?? {}),
            rounds: element?.rounds ?? "",
            tournamentPoints: element?.tou_points ?? "",
          };

if(finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points){
  for (let e of finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points) {
    e.team.url = await this.imageURL(e?.team?.code) || process.env.country
  }
}
if(element.play){

}


        element.team.a.url =  await this.imageURL(element?.team?.a?.code) || process.env.country
        element.team.b.url =  await this.imageURL(element?.team?.b?.code) || process.env.country
        element.team.a.match_key = element?.match_key
        element.team.b.match_key = element?.match_key
        matchData.push({
          subTitle: element?.sub_title ?? "",
          status: element?.status ?? "",
          start_at: new Date(element.start_at).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
          winner: element?.winner ?? "",
          team: element?.team ?? "",
          venue: element?.venue ?? "",
          messages: element?.messages ?? " ",
          format: element?.format ?? " ",
          toss: element?.toss ?? "",
          estimatedEndDate: element?.estimated_end_date ?? "",
          completedDateApproximate: element?.completed_date_approximate ?? "",
          umpires: element?.umpires ?? "",
          weather: element?.weather ?? "",
          result : element?.play?.result,
          target : element?.play?.target,
          innings : {a_1 : {index :element?.play?.innings['a_1'].index, overs :element?.play?.innings['a_1'].overs ,  score :element?.play?.innings['a_1'].score , wickets :element?.play?.innings['a_1'].wickets  } , 
          b_1 : {index :element?.play?.innings['b_1'].index, overs :element?.play?.innings['b_1'].overs ,  score :element?.play?.innings['b_1'].score , wickets :element?.play?.innings['b_1'].wickets  }
        }
        });
        if(element.players){
          (Object.values(element?.players?? {})).map((e: any) => {
            players.push(e?.player)
          })
        }
        if(element.team){
          teams.push(...Object.values(element?.team?? {}))
        }
      };
    
      let team: any = await this.createTeam(teams, players)
      finalData['teamsDetails'] ? finalData['teamsDetails']['matches'] = matchData : {}
      teams = [...new Map(teams.map(item => [item['key'], item])).values()]
      finalData['teamsDetails']['teams'] = team
      return this.sendSuccess(res, { data: finalData })
    }
    catch (err) {
      console.log(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
}

