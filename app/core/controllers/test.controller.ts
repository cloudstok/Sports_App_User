import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { commentary, score } from "./live/liveScore";
import { match } from '../controllers/match.controller'
import { playerController} from '../controllers/player.controller'
export class TestController extends ResponseInterceptor {
  connection: connection
  match: match
  playerController :playerController
  constructor() {
    super();
    this.connection = new connection()
    this.match = new match()
    this.playerController = new playerController()
  }

  async test(req, res) {
    try {
      console.log("live")
      this.connection.write.query("insert into logs (body,query,header) values (?,?,?)", [JSON.stringify(req.body), JSON.stringify(req.query), JSON.stringify(req.headers)])
      let data = req?.body?.data
      // console.log(data.status)
      // ====================  for score commentory 
        let   player = await  this.playerController.socrcard([{play : data.play , players : data.players ,team : data.teams}])
        let commentaryData = {}
        commentaryData['commentory'] = Object.values(data?.play?.related_balls);
        commentaryData['live'] = data?.play?.live
        await commentary(commentaryData, data.key);
        //=====================   for score Data 
        let scoreData = {}
        scoreData['innings'] = data?.play?.innings;
        scoreData['live'] = data?.play?.live
        scoreData['players'] = player
        await score(scoreData, data.key)
        await this.match.update_live_match(data)
      
      return this.sendResponse(res, 200, { message: "OK" })
    } catch (err) {
      console.error(err);
    }

  }
}
