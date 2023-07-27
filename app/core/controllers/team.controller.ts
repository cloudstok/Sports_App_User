import { SQL_GET_TEAM } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";

export class teamController extends ResponseInterceptor{
    connection : connection
    constructor(){
    super()
    this.connection = new connection();
    }

    async getTeam (req:any, res:any){
        try{
          let [team] = await this.connection.write.query(SQL_GET_TEAM);
          return this.sendSuccess(res, {data: team})

        }
        catch(err){
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
}