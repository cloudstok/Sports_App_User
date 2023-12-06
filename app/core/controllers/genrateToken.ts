import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { RedisOperations } from '../redis/redis'
import { json } from "stream/consumers";
import { appConfig } from "../../config/appConf";

const redis = new RedisOperations()
export class token extends ResponseInterceptor {
  connection: connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async genrateToken() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "api_key": appConfig.API_KEY
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://api.sports.roanuz.com/v5/core/${appConfig.PROJECT_KEY}/auth/`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })

      .then(response => response.text())
      .then(async (result: any) => {
        // console.log(result)
        this.setTokenRedis(result)
        this.insertToken(result)

      })
      .catch(error => console.log('error', error));

  }

  async setTokenRedis(data) {
    data = JSON.parse(data)
    data.data.project_key = appConfig.PROJECT_KEY
    data.data.api_key = appConfig.API_KEY
    await redis.setRedis("token", JSON.stringify(data?.data), 23*3600)
   // console.log(await redis.getRedis("token"), "token")
  }

  async insertToken(data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    await this.connection.write.query(`UPDATE credentials SET is_active = 0 WHERE is_active = 1`);

    let { token, expires } = data?.data;
    await this.connection.write.query(`INSERT INTO credentials (rs_token, project_key, api_key, token_expiry) VALUES(?, ?, ?, ?)`, [token, appConfig.PROJECT_KEY, appConfig.API_KEY, expires]);
  }
}