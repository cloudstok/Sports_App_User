import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { user } from "../core/controllers/userController";
import { ThemeController } from "../core/controllers/themes.controller";
import { reel } from "../core/controllers/reel.controller";
import { teamController } from '../core/controllers/team.controller'
import { tournament } from "../core/controllers/tournament.controller";
import { match } from "../core/controllers/match.controller";
import { otpController } from "../core/controllers/otp.controller";
export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  user: user
  theme: ThemeController
  reel: reel
  teamController :teamController
  tournament  : tournament
  match : match
  otpController : otpController
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.user = new user();
    this.theme = new ThemeController();
    this.reel = new reel();
    this.teamController = new teamController()
    this.tournament = new tournament();
    this.match = new match()
    this.otpController = new otpController()
  }

  /**
    *  page not found.  
   */
  pageNotFound(req : any, res :any, ) {
    this.responseInterceptor.sendError(res, 404, "InvalidURI", "Requested URL is invalid. Please try again");
  }
  testAPI(req : any, res  : any){
    this.test.test(req, res, )
  }
  register(req : any ,res : any){
    this.user.register(req, res)
  }
  genrateOtp(req : any ,res : any){
    this.otpController.genrateOtp(req, res)
  }
  verifyOtp(req : any ,res : any){
    this.otpController.verifyOtp(req, res)
  }
  login(req : any, res : any){
    this.user.login(req, res)
  }
  findAllUSer(req: any, res : any){
    this.user.findAllUsers(req, res)
  }
  updateUser(req:any, res :any){
    this.user.updateAllUser(req, res)
  }
  deleteUser(req:any, res :any){
    this.user.DeleteUser(req, res)
  }
  userFindById(req:any, res :any){
    this.user.findById(req, res)
  }

  // <-----------------for themes------------------->
addThemes(req:any, res: any){
  this.theme.addThemes(req,res)
}

getAllThemes(req: any, res: any){
  this.theme.showThemes(req, res)
}
updateTheme(req: any, res: any){
  this.theme.updateThemes(req ,res)
}  
deleteThemes(req:any, res: any){
  this.theme.deleteThemes(req,res)
}

//-------------------reels------------------------->
showReel(req:any, res: any){
  this.reel.showReel(req,res)
}
addUpdateReelStatus(req:any, res:any){
  this.reel.addUpdateReelStatus(req,res)
}
//--------------------News------------------------>
getNews(req:any, res: any){
  this.reel.getNews(req,res)
}
getTeam(req:any, res: any){
  this.teamController.get_team(req,res)
}
get_tournament(req:any, res: any){
  this.tournament.get_tournament(req,res)
}
get_match(req:any, res: any){
  this.match.get_match(req,res)
}
pointTable(req:any, res: any){
  this.match.point_table(req,res)
}
}