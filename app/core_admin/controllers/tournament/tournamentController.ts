
import { ResponseInterceptor } from "../../utilities/response-interceptor";
import { connection} from "../../../config/dbConf";
import { uploads3 } from "../../../core/aws/uploads3";

export class tournament extends ResponseInterceptor {
connection : connection
uploads3 : uploads3
  constructor() {
    super();
    this.connection = new connection()
    this.uploads3 = new uploads3()

  }

  async addImageTournament(req :any , res :any){
    try{
    let url = '';
    if (req.files && req.files.length > 0) {
        let imageUrl = await this.uploads3.uploadImage(req.files)
        url = imageUrl.Location
    }
     console.log(url, req.query.tou_key)
    const sql = "UPDATE tournament SET imgURl = ?  where tou_key = ?"
    await this.connection.write.query(sql , [url , req.query.tou_key])
    this.sendSuccess(res, {status: true, msg: ' image uploaded  successfully'})
  }catch(err){
      console.error(err)
      this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
  }
  }
}
