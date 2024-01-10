import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";

export class squadController extends ResponseInterceptor {
  connection: connection
  constructor() {
    super();
    this.connection = new connection()
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


  // not use
  async getSquad(req: any, res: any) {
    try {
      let sql = "SELECT team , players FROM sport_app.cricket_match where tou_key = ?"
      let data = []
      let [squad]: any = await this.connection.write.query(sql, [req.query.tou_key])
      for (let x of squad) {
        let players: any =x.players ? Object.values(x.players) :[]
        delete x.players
        x.team.a.players = { bt: [], bo: [], ar: [] }
        x.team.b.players = { bt: [], bo: [], ar: [] }
        for (let e of players) {
          let { key, name, roles, gender, legal_name, jersey_name, nationality, batting_style, bowling_style, date_of_birth, legal_name_v2, seasonal_role, jersey_name_v2, skills } = e.player
          if (e.player.nationality.code === x.team.a.country_code) {
            x.team.a.url = await this.imageURL(x.team.a.country_code)
            let playerImage = await this.playerImage(key)
            if (roles[0] === 'all_rounder') {
              x.team.a.players.ar.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            } else if (roles[0] === 'batsman') {
              x.team.a.players.bt.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            } else {
              x.team.a.players.bo.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            }
          }
          if (e.player.nationality.code === x.team.b.country_code) {
            x.team.b.url = await this.imageURL(x.team.b.country_code)
            let playerImage = await this.playerImage(key)
            if (roles[0] === 'all_rounder') {
              x.team.b.players.ar.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            } else if (roles[0] === 'batsman') {
              x.team.b.players.bt.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            } else {
              x.team.b.players.bo.push({ key: key, name: name, role: roles, playerImage: playerImage, nationality: nationality })
            }
          }
        }
        x.team = Object.values(x.team)
        data.push(...x.team)
      }
      data = [...new Map(data.map(item => [item['country_code'], item])).values()]

      return this.sendSuccess(res, { data: data })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

}
