import { all } from "axios";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";

export class teamController extends ResponseInterceptor{
    connection : connection

    constructor(){
        super()
        this.connection = new connection()
    }

    async get_team(req:any, res: any){
        try{
          let sql = "select  * from teams"
          let teams  = await this.connection.write.query(sql);
          return this.sendSuccess(res, { data: teams })
        }
        catch(err){
              console.log(err)
        }
    }

}

