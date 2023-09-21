import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";

export class tournament extends ResponseInterceptor{
    connection : connection
    constructor(){
        super()
        this.connection = new connection()
    }

    async get_tournament(req:any, res: any){
        try{
          let sql = "select  * from tournament"
          let [tournament]  = await this.connection.write.query(sql);
          return this.sendSuccess(res, { data: tournament })
        }
        catch(err){
              console.log(err)
        }
    }

}

