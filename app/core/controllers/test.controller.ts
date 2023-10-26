import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";

export class TestController extends ResponseInterceptor {
connection : connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async test(req, res ) {
    console.log(req.body , req.query , req.header)
    this.connection.write.query("insert into logs (body,query,header) values (?,?,?)",[JSON.stringify(req.body), JSON.stringify(req.query), JSON.stringify(req.headers) ])

    return this.sendResponse(res, 200, { message:"OK" })
    
  }

  async register(req :any, res : any){
    try{
      let [sql] = await this.connection.read.query("select * from signup") 
       return this.sendResponse(res ,200 , {data : sql}) 
    }
    catch(err){
      console.log(err)

    }
  }


  
}
