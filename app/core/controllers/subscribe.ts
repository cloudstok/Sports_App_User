import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { appConfig } from "../../config/appConf";
const axios = require('axios');

let data = JSON.stringify({
    "method": "web_hook"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
   url : '',
    headers: { 
      'rs-token': appConfig.RS_TOKEN, 
      'Content-Type': 'application/json'
    },
    data : data
  };

export class auto  {
  connection: connection
  constructor() {
    this.connection = new connection()
  }

  async subscribe() {
    try {
        const sql = "SELECT match_key ,start_at FROM cricket_match  where status = 'not_started'"
      const [data]: any =   await this.connection.write.query(sql)
      let s = data.filter(e=> {
        const date= new Date()
        let  a = date.getTime()+(5.5*60*60*1000)
        const b = +e.start_at * 1000;
        const c = a + (24*60*60*1000)
        if(c >= b && a <= b){
          e.date = new Date(b)
          let url = `https://api.sports.roanuz.com/v5/cricket/${appConfig.PROJECT_KEY}/match/'${e.match_key}'/subscribe/`
          this.subscribe_match(url)
           return e
        }
    })
    console.log(s)

   
    } catch (err) {
      console.error(err);
    }

  }


  // ----------------------------

async subscribe_match(url){ 
    config.url = url
    console.log(config)
// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

}

}
