
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
    try {
      let [match_data]: any = await this.connection.write.query("SELECT match_key, name, status, start_at, format, estimated_end_date, completed_date_approximate, tou_key, tou_name from cricket_match where match_key = ?", [req.params.match_key]);
      let data: any = await this.subscribe(match_data[0])
      res.send(data)
    } catch (err) {
      console.error(`[ERR] while subscribing for matches is::`, err)
      res.status(500).send(err)
    }
  }

  async subscribe(match_data) {
    await this.token.getToken()
    return new Promise(async (resolve, reject) => {
      try {
        let { match_key, name, status, start_at, format, estimated_end_date, completed_date_approximate, tou_key, tou_name } = match_data
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
        }).then(response => response.text()).then((result) => {
          this.connection.write.query("update  cricket_match set is_subscribe = 1 where match_key = ?", [match_key]).catch(err => {
            console.error(`[Err]:::`, err);
            reject({ status: false, msg: err })
          })
          this.connection.write.query(`INSERT INTO match_subscribtion (match_key, name, status, start_at, format, estimated_end_date, completed_date_approximate, tou_key, tou_name) VALUES(?,?,?,?,?,?,?, ?,?)`, [match_key, name, status, start_at, format, estimated_end_date, completed_date_approximate, tou_key, tou_name]).catch(err => {
            console.error(`[Err]:::`, err);
            reject({ status: false, msg: err })
          });
          resolve({ status: true, msg: JSON.parse(result) });
        }).catch(error => {
          reject({ status: false, msg: error })
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
        let startTime = new Date(+x.start_at * 1000);
        // console.log(new Date(+x.start_at * 1000))
        // await this.subscribe(x.match_key)
      }
    } catch (err) {

    }
  }


}
