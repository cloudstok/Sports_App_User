import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
export class NotificationController extends ResponseInterceptor {
    connection: connection
    constructor() {
      super()
        this.connection = new connection()

    }
    async findDiviceId(key, id) {
      let sql = "select * from notification where  ? "
        let [data] : any =  await this.connection.write.query(sql , [id])
        let devices =  data.map(e=>e.divice_id)
    }
    async addDeviceId(req , res) {
        let sql = "insert into notification set = ?"
          let data =  await this.connection.write.query(sql , [req.query])
      }

 async update(req , res) {
        let {id} = req.query.id 
        let sql = "update  notification set = ? where  noti_id = ?"
          let data =  await this.connection.write.query(sql , [ req.query ,  id])
      }   

 async adminSendNitification(req, res){
  try{
    let {message} = req.body
    return this.sendSuccess(res, { message: "Notification Send Successfully"})
  }catch(err){
    this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
  }
 }     
}











