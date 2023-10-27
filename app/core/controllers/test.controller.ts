import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";

export class TestController extends ResponseInterceptor {
connection : connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async test(req, res ) {
    try{
      console.log(req.body  )
      this.connection.write.query("insert into logs (body,query,header) values (?,?,?)",[JSON.stringify(req.body), JSON.stringify(req.query), JSON.stringify(req.headers) ])
  
      return this.sendResponse(res, 200, { message:"OK" })
    }catch(err){
      console.error(err);
    }
    
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
