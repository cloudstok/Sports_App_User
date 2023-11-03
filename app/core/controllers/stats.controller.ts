import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";

export class statsController extends ResponseInterceptor {
connection : connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async imageURL(code , name){
    let country  = "select * from countries where code = ? OR name = ?" 
    let [countries] = await this.connection.write.query(country ,  [code , name])
    if(countries && countries[0]?.['imgURl'] !== undefined){
      return countries[0]?.['imgURl']
    }else{
      return ""
    }
  }

  async playerImage(player_key){
    try{
      let sql = "select  image from players where player_key = ?"
      let [image]: any  = await this.connection.write.query(sql , [player_key]);
      return image[0]?.image
    }
    catch(err){
          console.log(err)
    }
  }
  
  async get_stats(req:any, res: any){
    try{
      let sql = "select  * from stats where tou_key = ?"
      let [stats]: any = await this.connection.write.query(sql , [req.query.tou_key]);
     for(let s of stats){
        s.nationality.image = await this.imageURL(s.nationality.code , s.nationality.name)   || process.env.country 
       s.player_image = await this.playerImage(s.player_key)
       delete s.image
     }

      return this.sendSuccess(res, { data: stats })
    }
    catch(err){
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
}
  
}
