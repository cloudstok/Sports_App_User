import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { Expo } from 'expo-server-sdk';

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
export class NotificationController extends ResponseInterceptor {
  connection: connection
  constructor() {
    super()
    this.connection = new connection()

  }
  async registerDevice(req, res) {
    try {
      const { phone } = res.locals.auth.user
      console.log(res.locals.auth.user, req.body.deviceId)
      await this.connection.write.query(`INSERT INTO notification(device_id , user_id) VALUES (? , ?)`, [req.body.deviceId, phone]);
      return this.sendSuccess(res, { status: "success", msg: "Device registered successfully" });
    } catch (err) {
      console.error(`[ERR] while registering device is::`, err);
      return this.sendInternalError(res)
    }
  }

  // notification subscrib
  async subscribeToNotification(req, res) {
    try {
      const { phone, device } = res.locals.auth.user
      const { match_key, tou_key } = req.body
      await this.connection.write.query(`INSERT INTO notification(device_id , user_id , match_key , tou_key)  values(? ,?,?,?)`, [device, phone, match_key, tou_key]);
      return this.sendSuccess(res, { status: "success", msg: "Notification Subscribe 😍" });
    } catch (err) {
      console.error(`[ERR] while registering device is::`, err);
      return this.sendInternalError(res)
    }
  }

  async findAllDevice(req, res) {
    let sql = "select * from notification where is_deleted = 1 "
    let [data]: any = await this.connection.write.query(sql)
    return this.sendSuccess(res, { status: "success", data });
  }

  // find devices for notification
  async findDiviceId(key) {
    let sql = "select * from notification where  ? "
    let [data]: any = await this.connection.write.query(sql, [key])
    let devices = data.map(e => e.divice_id)
  }
  //  add device for notification
  async addDeviceId(req, res) {
    let sql = "insert into notification set = ?"
    let data = await this.connection.write.query(sql, [req.query])
  }
  //  update notification device , active or deactive
  async update(req, res) {
    try{

      let {id} = req.query
      let sql = "update notification set ? where  noti_id = ?"
      // delete req.query.id
      let data = await this.connection.write.query(sql, [req.body, id])
      // console.log( [req.body, id] , data)
      return this.sendSuccess(res, { status: "success", msg: "device update Successfully 👍" });
    }catch(err){
     console.error(`[ERR] while update device is::`, err);
      return this.sendInternalError(res)
    }
   

  }
  // admin send notification all devices
  async adminSendNitification(req, res) {
    try {
      let { notification } = req.body
      console.log(notification, "message")
      return this.sendSuccess(res, { message: "Notification Send Successfully" })
    } catch (err) {
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }

  //  send expo devices notification 

  async sendNotification(req: any, res: any) {
    let { notification } = req.body
    const messages = [];
    let [pushTokens]: any = (await this.connection.write.query(`SELECT device_id from notification where is_active = 1 and is_subscribe = 1 and is_deleted = 1`));
    pushTokens = pushTokens.map(e => e.device_id)
    // console.log(pushTokens)
    pushTokens =  [...new Set(pushTokens)]
    for (const pushToken of pushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: 'default',
        title: notification,
        notification,
      });
    }
    const chunks = expo.chunkPushNotifications(messages);
    await Promise.all(
      chunks.map(async chunk => {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          return this.sendSuccess(res, { status: "success", msg: "Notification Send Successfully 👍" });
        } catch (error) {
          console.error("[ERR] while sending notification is:::", error);
          return this.sendBadRequest(res, 'failed to send push token')
        }
      }),
    );
  }

}











