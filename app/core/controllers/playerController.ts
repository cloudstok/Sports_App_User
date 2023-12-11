import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { cricketApi } from "./thirdPartyApi/thirdPartyApi";
import { uploads3 } from "../aws/uploads3";
import { countries } from './countries'

const vinay = "https://jaunpur123.s3.ap-south-1.amazonaws.com/1697093979829_vinay.jpeg"

export class players extends ResponseInterceptor {
  connection: connection
  cricketApi: cricketApi
  uploads3: uploads3
  countries: countries
  constructor() {
    super();
    this.connection = new connection()
    this.cricketApi = new cricketApi()
    this.uploads3 = new uploads3()
    this.countries = new countries()
  }

  async addStats(req: any, res: any) {
    try {

      let stats: any = await this.cricketApi?.get_tournament_stats(req?.params?.tou_key);
      stats = stats.data
      stats.players = Object.values(stats.players)
      stats.teams = Object.values(stats.teams)
      for (let x of stats.teams) {
        let player = []
        for (let y of stats.players) {
          if (x.key === y.team_key) {
            // batting
            let batting = Object.keys(stats.player.batting)
            let bowling = Object.keys(stats.player.bowling)
            let fielding = Object.keys(stats.player.fielding)
            let performance = {
              batting: {},
              bowling: {},
              fielding: {}
            }
            for (let z of batting) {
              let battingData = { [z]: stats?.player?.batting[z].find((e: any) => e?.player_key === y?.key) }
              if (battingData[z]) {
                // performance.batting = battingData
                Object.assign(performance.batting, battingData)
              }
            }
            for (let z of bowling) {
              let bowlingData = { [z]: stats?.player?.bowling[z].find((e: any) => e?.player_key === y?.key) }
              if (bowlingData[z]) {
                // performance.bowling.push(bowlingData)
                Object.assign(performance.bowling, bowlingData)

              }
            }
            for (let z of fielding) {
              let fieldingData = { [z]: stats?.player?.fielding[z].find((e: any) => e?.player_key === y?.key) }
              if (fieldingData[z]) {
                // performance.fielding.push(fieldingData)
                Object.assign(performance.fielding, fieldingData)

              }
            }
            y.performance = performance
            player.push(y)
          }
        }
        x.player = player
      }
      delete stats.players
      delete stats.player
      const sql_addStats = 'insert into stats(tou_key ,player_name, jersey_name, player_key , legal_name,gender , date_of_birth, nationality , team_key , seasonal_role , performance) values ?';
      const sql_chackStats = "SELECT * FROM stats where player_key = ? AND tou_key = ? ;"
      const sql_updateStats = "update stats set performance = ? where player_key = ? AND tou_key = ?";
      let d = []
      let p = []
      for (let e of stats.teams) {
        for (let el of e.player) {
          // console.log(Object.keys(el))
          let [data]: any = await this.connection.write.query(sql_chackStats, [el.key, req.params.tou_key])
          if (data.length === 0) {
            d.push([req.params.tou_key, el.name, el.jersey_name, el.key, el.legal_name, el.gender, el.date_of_birth, JSON.stringify(el.nationality), el.team_key, el.seasonal_role, JSON.stringify(el?.performance ?? {})])
            p.push([el.key, el.name, el.jersey_name, el.legal_name, el.gender, el.date_of_birth, JSON.stringify(el.nationality)])
          } else {
            await this.connection.write.query(sql_updateStats, [JSON.stringify(el?.performance ?? {}), el.key, req.params.tou_key])
          }
        }

      }
      if (d.length > 0) {
        await this.addPlayer(p)
        await this.connection.write.query(sql_addStats, [d])
      }

      this.sendSuccess(res, { message: "Player Stats inserted successfully" })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }




  async addPlayer(data: any) {
    try {
      await this.connection.write.query("insert  IGNORE into  players(player_key, player_name , jersey_name, legal_name ,  gender , date_of_birth , nationality) values ? ", [data])
      return true
    } catch (err) {
      console.error(err)
    }
  }

  async addplayerImage(req: any, res: any) {
    try {
      let url = '';
      if (req.files && req.files.length > 0) {
        let imageUrl = await this.uploads3.uploadImage(req.files)
        url = imageUrl.Location
      }
      const sql = "UPDATE  players SET image = ?  where player_key = ?"
      await this.connection.write.query(sql, [url, req.query.p_key])
      this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully ' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


  async getPlayer(player: any) {
    try {
      if (player.length > 0) {
        let sql = `select * from players where player_key in (?)`;
        const [data] = await this.connection.write.query(sql, [player])
        return data
      } else {
        return null
      }

    } catch (e) {
      console.log(e)
    }

  }

  async getTeamPlayer(req: any, res: any) {
    try {
      const sql = "select team, squad from cricket_match where match_key = ? "
      let [player]: any = await this.connection.write.query(sql, [req.query.match_key])
      for (let x of player) {
        x.team.a.url = await this.countries.teamImageURL(x.team.a.code)
        x.team.b.url = await this.countries.teamImageURL(x.team.b.code)
        if (x.squad.a.playing_xi) {
          x.team.a.player = await this.getPlayer(x.squad.a.playing_xi)
          x.team.b.player = await this.getPlayer(x.squad.b.playing_xi)
          delete x.squad.a.player_keys
          delete x.squad.b.player_keys
        } else {
          x.team.a.player = await this.getPlayer(x.squad.a.player_keys)
          x.team.b.player = await this.getPlayer(x.squad.b.player_keys)
        }
        delete x.squad
      }
      // console.log(player)
      player = Object.values(player[0]?.team)

      return this.sendSuccess(res, { data: player })
    } catch (err) {
      console.error(`Error while Find Team Player is::::`, err);
      return this.sendInternalError(res, 'Something went wrong with the request')
    }
  }

}

