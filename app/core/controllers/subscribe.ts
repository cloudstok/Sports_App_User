import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { appConfig } from "../../config/appConf";
import axios from 'axios';
import { RedisOperations } from "../../core/redis/redis";
const redis = new RedisOperations()

export class subscribe {
  connection: connection
  constructor() {
    this.connection = new connection()
  }

  async subscribeMatches(req, res) {
      let data : any = await this.subscribe(req.params.match_key)
       // console.log(data)
       res.send(data)  
  }
    
async subscribe (match_key){
  return new Promise(async (resolve, reject)=> {
    try{
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
        .then( (result) => {
           this.connection.write.query("update  cricket_match set is_subscribe = 1 where match_key = ?" , [match_key])
          resolve({ status : true , msg: JSON.parse(result)});
        })
        .catch(error =>{

          reject({ status : false , msg: JSON.parse(error) })
        });
    }catch(err){
      reject({ status : false , msg: err});
    }
  })
}

async subscribeMatchCron (){
  try{
    

  }catch(err){
    
  }
}


}
