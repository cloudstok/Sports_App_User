import { ResponseInterceptor } from "../../utilities/response-interceptor";
import { connection} from "../../../config/dbConf";
import { cricketApi } from "../../thirdPartyApi/thirdPartyApi";
export class static_data extends ResponseInterceptor {
connection : connection
cricketapi : cricketApi
  constructor() {
    super();
    this.connection = new connection()
    this.cricketapi = new cricketApi()
  }

async add_association(req :any , res : any){
    try{
      let result :any = await this.cricketapi.get_associations();
      let finalData = []
for(let x of result?.data?.associations){
   finalData.push([
    x?.key?? "" ,x?.code?? "" ,x?.name?? "" ,x?.country?.code?? "" , x?.parent?? ""
   ])
}   
const sql = 'insert IGNORE into associations(ass_key ,code , name , country , parent) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'association inserted successfully'})

    }catch(err){
      console.log(err)

    }
}
async add_venues(req :any , res : any){
    try{
      let result :any = await this.cricketapi.venues(1);
      let finalData = []
for(let x of result?.data?.venues){
   finalData.push([
    x?.key?? "" ,x?.city?? '' ,x?.name?? '' ,x?.country?.code?? "", x?.geolocation?? ''
   ])
}   
const sql = 'insert IGNORE into venues(ven_key ,city , name , country , geolocation) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'venues inserted successfully'})
    }catch(err){
      console.log(err)

    }
}

async add_countries(req :any , res : any){
    try{
      let result :any = await this.cricketapi.countries();
      let finalData = []
for(let x of result?.data?.countries){
   finalData.push([
    x.short_code ,x.code ,x.name ,x.official_name , x.is_region
   ])
}   
const sql = 'insert IGNORE into countries(short_code ,code , name , official_name , is_region) VALUEs ?' 
   await this.connection.write.query(sql , [finalData])
   this.sendSuccess(res, {status: true, msg: 'countries inserted successfully'})
    }catch(err){
      console.log(err)

    }
}





}
