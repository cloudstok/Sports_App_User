import { ResponseInterceptor } from "../../utilities/response-interceptor";
import { connection } from "../../../config/dbConf";
import { cricketApi } from "../../thirdPartyApi/thirdPartyApi";

import { commonFunctions } from "../../utilities/common-functions.bin";

const add_tournaments = "insert IGNORE into tournament(tou_key ,name , short_name , countries , start_date , gender , point_system ,competition , association_key , metric_group , sport , is_date_confirmed , is_venue_confirmed , last_scheduled_match_date ,formats ) VALUEs ?"
const update_tournament = "update tournament set name = ? , short_name = ?, countries = ?, start_date = ? , gender= ? , point_system =?,competition =? , metric_group = ?, sport = ?  , is_date_confirmed = ?, is_venue_confirmed = ?, last_scheduled_match_date= ? ,formats= ? where tou_key = ? "
const update_tournaments = "update tournament set teams = ? , rounds = ? where tou_key = ? "
const add_matches = "insert ignore into cricket_match(match_key,name,short_name,sub_title,status,start_at,tou_key,tou_name,tou_short_name,metric_group,sport,winner,team,venue,association,messages,gender,format) values ?"
const detail_match = "update  cricket_match set toss = ?, play =?, players=?, notes = ?, data_review=?, squad = ?, estimated_end_date = ?, completed_date_approximate = ?, umpires=?, weather = ? where match_key = ?";
const add_teams = "insert ignore into teams(team , tournament , tournament_team) value(?,?,?)"
const table = "INSERT IGNORE INTO result_table (tou_key, tou_name, rounds) VALUES (?, ?, ?)"
const update_table = "update  result_table set rounds= ? where tou_key =?"
const update_match = "UPDATE cricket_match SET name = ?,short_name = ?,sub_title =?,status =?,start_at =?,tou_key =?,tou_name = ?,tou_short_name = ?, metric_group = ?,sport = ?,winner = ?,team = ?,venue = ?,association = ?,messages = ?,gender = ?,format = ?  where match_key = ?"
export class API_TO_INTEGRATE extends ResponseInterceptor {
  connection: connection;
  cricketapi: cricketApi;z
  commonFunction: commonFunctions;
  constructor() {
    super();
    this.connection = new connection();
    this.cricketapi = new cricketApi();
    this.commonFunction = new commonFunctions();
  }


//  add tournament / update tournament with association key 

  async add_tournaments(req: any, res: any) {
    try {
      let result: any = await this.cricketapi.Featured_Tournaments(req.query.ass_key);
      let finalData = []
      let updateDate = []
      for (let x of result?.data?.tournaments) {
        const [check] : any = await this.connection.write.query("SELECT * FROM sport_app.tournament where tou_key = ?" , [x.key])
if(check.length > 0 ){
  updateDate.push([
    x.name, x?.short_name ?? "", x?.countries[0]?.code, new Date(x.start_date * 1000), x.gender, x.point_system, JSON.stringify(x?.competition ?? {}),  x.metric_group, x.sport, x.is_date_confirmed, x.is_venue_confirmed, new Date(x.last_scheduled_match_date * 1000), JSON.stringify(x.formats),  x.key,
  ])  
}else{
  finalData.push([
    x.key, x.name, x?.short_name ?? "", x?.countries[0]?.code, new Date(x.start_date * 1000), x.gender, x.point_system, JSON.stringify(x?.competition ?? {}), x.association_key, x.metric_group, x.sport, x.is_date_confirmed, x.is_venue_confirmed, new Date(x.last_scheduled_match_date * 1000), JSON.stringify(x.formats)
  ])
}  
 }
console.log(updateDate.length , "updateDate" , finalData.length , "finalData" )
 if(updateDate.length  > 0 ){
  for(let x of updateDate){
    await this.connection.write.query(update_tournament, x)
  }
 }
 if(finalData.length > 0){
  await this.connection.write.query(add_tournaments, [finalData])
 }
      this.sendSuccess(res, { status: true, msg: 'tournaments inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


//     update tournament whith tournament key



  async update_tournaments(req: any, res: any) {
    try {
      let detail_tournament: any = await this.cricketapi.get_tournament(req.query.tou_key)
      await this.connection.write.query(update_tournaments, [JSON.stringify(detail_tournament.data.teams), JSON.stringify(detail_tournament.data.rounds), req.query.tou_key])
      this.sendSuccess(res, { status: true, msg: 'tournaments detail inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async tournaments_point_table(req: any, res: any) {
    try {
      let detail_tournament: any = await this.cricketapi.get_tournament_tables(req.query.tou_key)
      await this.connection.write.query("update tournament set tou_points = ? where tou_key = ?", [JSON.stringify(detail_tournament?.data?.rounds), req.query.tou_key])
      this.sendSuccess(res, { status: true, msg: 'tournaments detail inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }




  async add_matches(req: any, res: any) {
    try {
      let match_data: any = await this.cricketapi.featured_matches(req.query.tou_key);
      let finalData = []
      // if(match_data?.data && match_data?.data?.matches){}
      for (let x of match_data?.data?.matches) {
        finalData.push([
          x.key, x.name, x.short_name, x.sub_title, x.status, new Date(x.start_at * 1000), x.tournament.key, x.tournament.name, x.tournament.short_name, x.metric_group, x.sport, x.winner, JSON.stringify(x.teams), JSON.stringify(x.venue), JSON.stringify(x.association), JSON.stringify(x.messages), x.gender, x.format
        ])
      }
      await this.connection.write.query(add_matches, [finalData])
      this.sendSuccess(res, { status: true, msg: 'matches inserted successfully' })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async update_matches(req: any, res: any) {
    try {
      let match_data: any = await this.cricketapi.featured_matches(req.query.tou_key);
      // let finalData = []
      for (let x of match_data.data?.matches) {
        let finalData = [
          x.name, x.short_name, x.sub_title, x.status, new Date(x.start_at * 1000), x.tournament.key, x.tournament.name, x.tournament.short_name, x.metric_group, x.sport, x.winner, JSON.stringify(x.teams), JSON.stringify(x.venue), JSON.stringify(x.association), JSON.stringify(x.messages), x.gender, x.format, x.key
        ]
        await this.connection.write.query(update_match, finalData)
      }
      this.sendSuccess(res, { status: true, msg: 'matches updated successfully' })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  async detail_match(req: any, res: any) {
    try {
      let match_detail: any = await this.cricketapi.detail_match(req.query.match_key);
      let { toss, play, players, notes, data_review, squad, estimated_end_date, completed_date_approximate, umpires, weather } = match_detail?.data;
      estimated_end_date = estimated_end_date && estimated_end_date !== undefined ? estimated_end_date : 0;
      await this.connection.write.query(detail_match, [JSON.stringify(toss), JSON.stringify(play), JSON.stringify(players), JSON.stringify(notes), JSON.stringify(data_review), JSON.stringify(squad), new Date(estimated_end_date * 1000), new Date(completed_date_approximate * 1000), JSON.stringify(umpires), weather, req.query.match_key]);
      this.sendSuccess(res, { status: true, msg: "Match details updated successfully" })

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  async add_teams(req: any, res: any) {
    try {

      let team_data: any = await this.cricketapi.get_tournament_team(req.query.tou_key, req.query.team_key)
      await this.connection.write.query(add_teams, [JSON.stringify(team_data.data.team), JSON.stringify(team_data.data.tournament), JSON.stringify(team_data.data.tournament_team)])
      this.sendSuccess(res, { status: true, msg: 'matches inserted successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  async table(req: any, res: any) {
    try {
      let tableData: any = await this.cricketapi.get_tournament_tables(req.query.tou_key)
      let data = [tableData.data.tournament.key, tableData.data.tournament.name, JSON.stringify(tableData.data.rounds)]
      let [check]: any = await this.connection.write.query(table, data)
      if (check.insertId == 0) {
        await this.connection.write.query(update_table, [JSON.stringify(tableData.data.rounds), tableData.data.tournament.key])
        this.sendSuccess(res, { status: true, msg: 'table updated successfully' })
      } else {
        this.sendSuccess(res, { status: true, msg: 'table inserted successfully' })
      }

    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  async fantasy_matchPoints(req: any, res: any) {
    try {

      let fantasy: any = await this.cricketapi.get_fantasy_matchPoints(req.query.match_key);
      let { match, overrides, metrics, players, teams, last_updated, points } = fantasy.data;
      last_updated = new Date(last_updated * 1000)
      const fantasy_sql = "INSERT IGNORE INTO fantasy( match_key , overrides, metrics, players, teams, last_updated) values( ?,?,?,?,?,?)";
      const point_sql = "INSERT IGNORE INTO fantasy_points( match_key , ranks, points, player_key, points_str, last_updated , tournament_points , points_breakup) values ?"
      let b = points.map(e => ([req.query.match_key, e.rank, e.points, e.player_key, e.points_str, new Date(e.last_updated * 1000), e.tournament_points, JSON.stringify(e.points_breakup)]))
      overrides = overrides ? overrides : {}
      await this.connection.write.query(point_sql, [b])
      await this.connection.write.query(fantasy_sql, [req.query.match_key, JSON.stringify(overrides), JSON.stringify(metrics), JSON.stringify(players), JSON.stringify(teams), new Date(last_updated * 1000)]);
      this.sendSuccess(res, { status: true, msg: "Fantasy points data inserted successfully" });
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

}


