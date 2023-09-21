import { SQL_GET_PLAYER } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";

export class playerController extends ResponseInterceptor{
    connection : connection
    constructor(){
    super()
    this.connection = new connection();
    }

    async getPlayer (req:any, res:any){
        try{
          let [player] = await this.connection.write.query(SQL_GET_PLAYER);
          return this.sendSuccess(res, {data: player})

        }
        catch(err){
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
}