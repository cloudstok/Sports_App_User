import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";

export class TestController extends ResponseInterceptor {
connection : connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async test(req :any, res :any) {
    return this.sendResponse(res, 200, { data: "Hello World"})
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
