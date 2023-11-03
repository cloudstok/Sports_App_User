import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { uploads3 } from "../aws/uploads3";

export class countries extends ResponseInterceptor {
  connection: connection
  uploads3: uploads3
  constructor() {
    super();
    this.connection = new connection()
    this.uploads3 = new uploads3()

  }
  async updateCountries(req: any, res: any) {
    try {
      let sql = "UPDATE countries SET ? where countries_id = ?"
      await this.connection.write.query(sql, [req.body, req.query.countries_id])
      this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


  async uploadImage(req: any, res: any) {
    try {
      let url = '';
      if (req.files && req.files.length > 0) {
        let imageUrl = await this.uploads3.uploadImage(req.files)
        url = imageUrl.Location
      }
      //  console.log(url , "image")
      const sql = "UPDATE  countries SET imgURl = ?  where code = ?"
      await this.connection.write.query(sql, [url, req.query.code])
      this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
}
