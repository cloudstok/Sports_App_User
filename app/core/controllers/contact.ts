import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";

export class contact extends ResponseInterceptor {
  connection: connection;
  constructor() {
    super();
    this.connection = new connection();
  }

  async postQuery(req,res) {
    try {
        const {name, email, phone} = req.body
        const sql = "INSERT INTO contacts(name, email, phone) VALUES(?,?,?)";
        await this.connection.write.query(sql , [name, email, phone])
      return  this.sendSuccess(res, { status: true, msg: "Query Sent Successfully" })
    } catch (err) {
      console.error(err);
      return this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

}
