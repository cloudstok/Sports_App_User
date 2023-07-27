import { SQL_GET_SERIES } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";

export class seriesController extends ResponseInterceptor{
    connection : connection
    constructor(){
    super()
    this.connection = new connection();
    }

    async getSeries (req:any, res:any){
        try{
          let [series] = await this.connection.write.query(SQL_GET_SERIES);
          return this.sendSuccess(res, {data: series})

        }
        catch(err){
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
}