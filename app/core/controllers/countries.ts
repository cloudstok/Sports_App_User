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
 
  async uploadImage(req: any, res: any) {
    try {
      let url = '';
      if (req.files && req.files.length > 0) {
        let imageUrl = await this.uploads3.uploadImage(req.files)
        url = imageUrl.Location
      }
       console.log(url , "image")

      const sql = "UPDATE  countries SET imgURl = ?  where code = ?"
        let data =  await this.connection.write.query(sql, [url, req.query.code])
        console.log(data)
      this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


async addTeamImage(req:any , res :any){
  try {
    let url = '';
    if (req.files && req.files.length > 0) {
      let imageUrl = await this.uploads3.uploadImage(req.files)
      console.log(imageUrl)
      url = imageUrl.Location
    }
    //  console.log(url , "image")
    let {key , code , name} = req.body
    const sql = "insert into countries (code  , name , imgURl) values(? , ? , ? )"
    await this.connection.write.query(sql, [code , name , url])
    this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully' })
  } catch (err) {
    console.error(err)
    this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
  }

}

async teamImageURL(code) {
  let country = "select * from countries where code = ? "
  let [countries] = await this.connection.write.query(country, [code])
  if (countries && countries[0]?.['imgURl'] !== undefined) {
    // console.log(code , countries[0]?.['imgURl'] )
    return countries[0]?.['imgURl']
    
  } else {
    return ""
  }
}

}
