
import { connection } from "../../config/dbConf";
import { token } from './genrateToken'
import { RedisOperations } from "../../core/redis/redis";
const redis = new RedisOperations()

export class subscribe {
  connection: connection
  token: token
  constructor() {
    this.connection = new connection()
    this.token = new token()
  }

  async subscribeMatches(req, res) {
    let data: any = await this.subscribe(req.params.match_key)
    // console.log(data)
    res.send(data)
  }

  async subscribe(match_key) {
    this.token.getToken()
    return new Promise(async (resolve, reject) => {
      try {
        var myHeaders = new Headers();
        const creds = JSON.parse(await redis.getRedis("token"))
        myHeaders.append("rs-token", creds?.token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "method": "web_hook"
        });
        fetch(`https://api.sports.roanuz.com/v5/cricket/${creds.project_key}/match/${match_key}/subscribe/`, {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        })
          .then(response => response.text())
          .then((result) => {
            this.connection.write.query("update  cricket_match set is_subscribe = 1 where match_key = ?", [match_key])
            resolve({ status: true, msg: JSON.parse(result) });
          })
          .catch(error => {

            reject({ status: false, msg: JSON.parse(error) })
          });
      } catch (err) {
        reject({ status: false, msg: err });
      }
    })
  }

  async subscribeMatchCron() {
    try {
      let [matchs]: any = await this.connection.write.query("SELECT * FROM sport_app.cricket_match where status = 'not_started' and is_subscribe = 0 and is_Active = 1")
      for (let x of matchs) {
        await this.subscribe(x.match_key)
      }

    } catch (err) {

    }
  }


}
