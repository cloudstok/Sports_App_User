import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";

export class otpController extends ResponseInterceptor {
  connection: connection;
  constructor() {
    super();
    this.connection = new connection();
  }
  generateRandom6DigitNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async add_otp(otp, phone) {
    try {
      var expiration_time = new Date();
      expiration_time.setMinutes(expiration_time.getMinutes() + 1);
      const sql =
        "INSERT INTO otp (otp, phone, status, retries, expiration_time) VALUES (? ,? ,? ,? , ?)";
      let [data] = await this.connection.write.query(sql, [
        otp,
        phone,
        "PENDING",
        0,
        expiration_time,
      ]);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async update_otp(data, id) {
    try {
      const sql = "update otp set ? where otp_id  = ?";
      await this.connection.write.query(sql, [data, id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async verify(id: any) {
    try {
      const sql = "select * from otp where otp_id  = ?";
      let [otpData]: any = await this.connection.write.query(sql, [id]);
      if (otpData) {
        return otpData[0]
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async genrateOtp(req: any, res: any) {
    try {
      const otp: number = await this.generateRandom6DigitNumber()
      let data: any = await this.add_otp(otp, req.query.phone);
      return this.sendSuccess(res, { OTP: otp, otp_id: data.insertId })
    } catch (err) {

      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async verifyOtp(req: any, res: any) {
    try {
      let { otp, otp_id } = req.query
      let data: any = this.verify(otp_id)
      if (data.otp === otp) {
        return this.sendBadRequest(res, "Invalid OTP", this.BAD_REQUEST)
      }
      if (data.expiration_time < new Date()) {
        return this.sendBadRequest(res, "OTP Expirer", this.BAD_REQUEST)
      }
      this.update_otp({ status: 'USED' }, otp_id)
      return this.sendSuccess(res, { message: "OTP Verify Successfully" })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


}
