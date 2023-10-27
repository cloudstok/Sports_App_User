import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection} from "../../config/dbConf";
import { cricketApi } from "../thirdPartyApi/thirdPartyApi";
const request = require('request');

export class TestController extends ResponseInterceptor {
connection : connection
cricketApi : cricketApi
  constructor() {
    super();
    this.connection = new connection()
    this.cricketApi = new cricketApi()

  }

  async test(req :any, res :any) {
    console.log(req)
  //   let data = await this.cricketApi.list_tournament("zat10_2023")
  
  //   console.log(data)

  //  res.send(data)

  //   return this.sendResponse(res, 200, { data: "Hello World"})

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
