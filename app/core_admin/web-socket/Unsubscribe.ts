import { appConfig } from '../../config/appConf'
import { ResponseInterceptor } from "../utilities/response-interceptor";
import axios from "axios";
export class UnsubscribeController extends ResponseInterceptor{
    constructor(){
      super();
    }
   
    async fetchDataFromSource(option){
      try{
        return new Promise((resolve, reject)=> {
           axios(option).then(response=> {
            resolve(response.data)
          }).catch(err=> {
            reject(err)
        })
  
        })
      }catch(err){
        console.log(err)
      }
     } 
async Unsubscribe(){
  try{
    let  project_key = 'RS_P_1698587357407744036'
    let token = 'v5sRS_P_1698587357407744036s13048101582988883170'
    let match_key = 'icc_wc_2023_g24'
    let options = {
      method: 'POST',
      headers: {
        'rs-token' :token,
        'Content-Type': 'application/json'
      },
    url: `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${match_key}/unsubscribe/`,

      body: JSON.stringify({
        method: "web_hook" 
        })
    
    }

    return (await this.fetchDataFromSource(options)) ;
 }catch(err){
  console.log(err)
 }

  

}
}

