
import { connection } from "../../config/dbConf";
import { countries } from './countries'
import { players } from "./playerController";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { AnyCnameRecord } from "dns";
const detail_match = "update  cricket_match set status = ?, play =?, players=?, data_review=?, squad = ?, estimated_end_date = ?, completed_date_approximate = ? where match_key = ?";
export class match extends ResponseInterceptor {
  connection: connection
  countries: countries
  players: players
  constructor() {
    super()
    this.connection = new connection()
    this.countries = new countries()
    this.players = new players()
  }
  // up date live data 
  async update_live_match(data: any) {
    // console.log(Object.keys(data))
    await this.connection.write.query(detail_match, [data.status, JSON.stringify(data.play), JSON.stringify(data.players), JSON.stringify(data.data_review), JSON.stringify(data.squad), data.estimated_end_date, data.completed_date_approximate, data.key])
    return true
  }

  async getMatchByTournament(req: any, res: any) {
    const [data]: any = await this.connection.write.query('SELECT match_key ,   team, squad , name, is_subscribe ,short_name, sub_title, status, start_at ,is_deleted,is_Active , tou_key from cricket_match where tou_key = ?', [req.params.tou_key])
    for (let x of data) {

      delete x.team;
      delete x.squad
      let start_at = new Date(x.start_at * 1000)
      let current_Date = new Date()
      let afterDate = new Date(new Date().setHours(new Date().getHours() + 8))

      if (current_Date <= start_at && afterDate >= start_at) {
        x.in_Houre = true
        //  console.log(true)
      } else {
        x.in_Houre = false
      }
      // console.log(start_at , current_Date , afterDate)
    }
    this.sendSuccess(res, { data: data })
  }



  // async getTeamPlayer(team , squad) {
  //   try {
  //       team.a.url = await this.countries.teamImageURL(team.a.code)
  //       team.b.url = await this.countries.teamImageURL(team.b.code)
  //      if(squad){
  //       if (squad.a.playing_xi) {
  //         team.a.player = await this.players.getPlayer(squad.a.playing_xi)
  //         team.b.player = await this.players.getPlayer(squad.b.playing_xi)
  //         delete squad.a.player_keys
  //         delete squad.b.player_keys
  //       } else {
  //         team.a.player = await this.players.getPlayer(squad.a.player_keys)
  //         team.b.player = await this.players.getPlayer(squad.b.player_keys)
  //       }
  //     }
  //     team = Object.values(team)
  //     return team
  //   } catch (err) {
  //     console.error(`Error while Find Team Player is::::`, err);
  //    return false
  //   }
  // }



  ///  find get Match Data from  database
  async getMatchData(sql: string) {
    try {
      let [tournament]: any = await this.connection.write.query(sql);
      for (let x of tournament) {
        let play: any = {}

        if (x.venue) {
          x.venue.country.url = await this.imageURL(x.venue?.country?.name) || process.env.country
        }
        x.team.a.url = await this.imageURL(x.team?.a?.name) || process.env.country
        x.team.b.url = await this.imageURL(x.team?.b?.name) || process.env.country
        x.start_at = x.start_at
        if (x.play) {
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
    catch (err) {
      console.log(err)
    }
  }

  // modified data foe  match Fxitures
  async getMatchFxitures(req: any, res: any) {
    try {
      let { limit, offset, date } = req.query

      let sql_MatchFxitures = `select match_key, name, short_name, sub_title, status, start_at, metric_group, sport, winner, team, gender, format, toss, play, estimated_end_date, completed_date_approximate, tou_key, tou_name, tou_short_name from cricket_match  order by start_at desc `;
      let matchData = await this.getMatchData(sql_MatchFxitures);
      let finalData = []
      for (let x of matchData) {
        let key = new Date(x?.start_at * 1000).toISOString().split('T')[0];
        let matchObj = {
          date: key,
          matches: [x]
        }
        let keyCheck = finalData.find(e => e.date === key)
        if (keyCheck) {
          keyCheck.matches.push(x)
        } else {
          finalData.push(matchObj)
        }
      }
      if (finalData.length > 0) {
        this.sendSuccess(res, { data: finalData })
      }
    } catch (err: any) {
      console.error('error while getting fixtues data is:::', err)
      this.sendBadRequest(res, err)
    }
  }


  // modified data for  match data

  async get_match(req: any, res: any) {
    try {
      let { limit, offset } = req.query;

      let sql_get_match = `select  match_key, name, short_name, sub_title, status, start_at, metric_group, sport, winner, team, venue, association, messages, gender, format, toss, play, notes, data_review, estimated_end_date, completed_date_approximate, umpires, weather, tou_key, tou_name, tou_short_name, created_at, updated_at, is_deleted, is_Active, is_subscribe from cricket_match where is_deleted = 1 and is_Active = 1 order by start_at desc`;
      let tournament: any = await this.getMatchData(sql_get_match);

      if (tournament && tournament.length > 0) {
        return this.sendSuccess(res, { data: tournament })
      }
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }



  async get_match_tournament(req: any, res: any) {
    try {
      let sql = "select match_key,name , short_name, sub_title,  start_at , status , metric_group , winner , gender , data_review , format, toss , format , venue,  team , squad, weather,   umpires ,  estimated_end_date , completed_date_approximate , association from cricket_match where tou_key = ?  and is_deleted = 1"
      let [tournament]: any = await this.connection.write.query(sql, [req.query.tou_key]);

      for (let x of tournament) {
        x.venue.country.url = await this.imageURL(x.venue.country.code)
        x.start_at = x.start_at.toLocaleString();
        if (x.squad) {
          x.squad = Object.values(x?.squad) || []
        }
      }
      return this.sendSuccess(res, { data: tournament })
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async imageURL(code: any) {
    let country = "select * from countries where name = ? "
    let [countries]: any = await this.connection.write.query(country, [code])
    if (countries && countries[0]?.['imgURl'] !== undefined) {
      return countries[0]?.['imgURl']
    } else {
      return ""
    }
  }
  async point_table(req: any, res: any) {
    try {
      let sql = "select * from result_table where tou_key = ?"
      let [table]: any = await this.connection.write.query(sql, [req.query.tou_key, +req.query.limit, +req.query.offset]);
      // console.log(table)
      table[0].rounds = JSON.parse(table[0].rounds)
      for (let x of table) {
        for (let y of x.rounds) {
          for (let z of y.groups) {
            for (let w of z.points) {
              w.team.imageURL = await this.imageURL(w.team.code)

            }

          }
        }
      }

      return this.sendSuccess(res, { data: table })
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  async fantasy_match_point(req: any, res: any) {
    try {
      let sql = "select  * from fantasy"
      let [fantasy] = await this.connection.write.query(sql);
      return this.sendSuccess(res, { data: fantasy })
    }
    catch (err) {
      console.log(err)
    }
  }
  async player(p_key: any) {
    try {
      let sql: string = "SELECT player_name ,image ,nationality FROM sport_app.players where player_key = ?";
      const [player] = await this.connection.write.query(sql, [p_key])
      return player

    } catch (err) {
      console.error(err)
    }
  }

  async fantasy_point(req: any, res: any) {
    try {
      let sql = "select * from fantasy_points where match_key = ? limit ? offset ?"
      const { match_key, offset, limit } = req.query
      let [points]: any = await this.connection.write.query(sql, [match_key, +limit, +offset]);
      for (let x of points) {
        let p: any = await this.player(x?.player_key);
        x.player_image = p[0]?.image
        x.player_name = p[0]?.player_name
        x.nationality = p[0]?.nationality
      }

      return this.sendSuccess(res, { data: points })
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  async finddetailsby_match_key(req: any, res: AnyCnameRecord) {
    try {
      let sql = `select match_key, name, short_name, sub_title, status, start_at, metric_group, sport, winner, team, venue, association, messages, gender, format, toss, play,  estimated_end_date, completed_date_approximate, umpires, weather, tou_key, tou_name, tou_short_name FROM cricket_match where match_key = ?`
      let [match]: any = await this.connection.write.query(sql, [req.query.match_key])
      match = match[0]
      if (typeof match === 'object') {
        if ((Object.keys(match)).length > 0) {
          match.team.a.url = await this.imageURL(match.team?.a?.name) || process.env.country
          match.team.b.url = await this.imageURL(match.team?.b?.name) || process.env.country
        }
      } else {
        return this.sendBadRequest(res, 'Match data not found')
      }

      return this.sendSuccess(res, { data: match })
    } catch (err) {
      console.error(err);
    }
  }

  async ActiveMatch(req: any, res: any) {
    try {
      const { value, tou_key } = req.query
      await this.connection.write.query('UPDATE cricket_match SET is_active = ? WHERE tou_key = ?', [value, tou_key]);
      if (+value) {
        return this.sendSuccess(res, { status: 'success', msg: "cricket_match Active successful" })
      } else {
        return this.sendSuccess(res, { status: 'success', msg: "cricket_match deActive successful" })
      }
    } catch (err) {
      // console.error(`Error while deleting tournament is::::`, err);
      return this.sendInternalError(res, 'Something went wrong with the request')
    }
  }




}

