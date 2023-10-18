import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";

export class TestController extends ResponseInterceptor {
connection : connection
  constructor() {
    super();
    this.connection = new connection()
  }

  async test(req :any, res :any) {

for(let x of req.body.data){
  await this.connection.write.query("UPDATE `cricket_match` SET `start_at` = ?  where match_key = ?" , [new Date(x.start_at) , x.match_key])
}
    return this.sendResponse(res, 200, { data:"update success fully"})
    
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
