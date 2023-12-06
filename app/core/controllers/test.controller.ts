import { ResponseInterceptor } from "../utilities/response-interceptor";
import { connection } from "../../config/dbConf";
import { commentary, score } from "./live/liveScore";
import { match } from '../controllers/match.controller'
import { playerController} from '../controllers/player.controller'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
      let last_ball_key
      if(data?.play?.live){
        last_ball_key = data?.play?.related_balls[data?.play?.live?.last_ball_key]
      }
      
      // console.log(data.status)
      // ====================  for score commentory 
      let player_Data =[{play : data.play , players : data.players ,team : data.teams, squad: data.squad}]
      // console.log(data.teams)
      let player
      // console.log(data.format , "gggg")
      if(data.format !== "test"){
         player = await  this.playerController.socrcard(player_Data)
      }else{
         player = await this.playerController.testmatchsocrcard(player_Data)
      }
    

        let commentaryData = {}
        commentaryData['commentory'] = Object.values(data?.play?.related_balls);
        commentaryData['live'] = data?.play?.live
        commentaryData['last_ball_key'] = last_ball_key || ""
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

   // --------------------------cloudstok web ------------
   async contacts(req ,res){
    try{
      const {name, company_name, designation, mobile, email} = req.body

     
const msg = [
  {
    to: email, // Change to your recipient
    from: 'deepak.chauhan@cloudstok.com', // Change to your verified sender
    subject: 'Cloudstok Sales',
    html: '<strong>Thankyou for reaching Cloudstok, our executive will get in touch with you Shortly..!!</strong>',
  },
    { 
     to: 'prashant.gupta@cloudstok.com', // Change to your recipient
     from: 'deepak.chauhan@cloudstok.com', // Change to your verified sender
    subject: 'New Ticket',
    html: `Please find the details of the customer below- <br/>
    <strong> 
    Name: ${name} <br/> 
    Company Name: ${company_name} <br/> 
    Designation: ${designation}<br/> 
    Mobile Number: ${mobile} <br/> 
    Email ID: ${email}
    </strong>`,
    }
  ]

  for(let i of msg){
    (async () => {
      try {
        await sgMail.send(i);
        console.log(`email sent successfully with options::`, i)
      } catch (error) {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
  }

  const sql = "INSERT INTO employees (name, company_name, designation, mobile, email) VALUES (? , ? ,? ,?,? )"
  await this.connection.write.query(sql, [name, company_name, designation, mobile, email])
  return res.status(200).send({status: true, message: 'Thankyou for reaching Cloudstok'})
    }catch(err){
      return res.send(err)
    }
   }
}
