import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { user } from "../core/controllers/userController";
import { ThemeController } from "../core/controllers/themes.controller";
import { reel } from "../core/controllers/reel.controller";
<<<<<<< HEAD
import { teamController } from '../core/controllers/team.controller'
import { tournament } from "../core/controllers/tournament.controller";
import { match } from "../core/controllers/match.controller";
import { otpController } from "../core/controllers/otp.controller";
=======
import { seriesController } from "../core/controllers/series.controller"; 
import { teamController } from "../core/controllers/team.controller";
import { playerController } from "../core/controllers/player.controller";
>>>>>>> a330244de1378098a2d5b034b52d2491d2d7bcd4
export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  user: user
  theme: ThemeController
  reel: reel
<<<<<<< HEAD
  teamController :teamController
  tournament  : tournament
  match : match
  otpController : otpController
=======
  seriesController : seriesController
  teamController : teamController
  playerController : playerController
  

>>>>>>> a330244de1378098a2d5b034b52d2491d2d7bcd4
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.user = new user();
    this.theme = new ThemeController();
    this.reel = new reel();
<<<<<<< HEAD
    this.teamController = new teamController()
    this.tournament = new tournament();
    this.match = new match()
    this.otpController = new otpController()
=======
    this.seriesController = new seriesController();
    this.teamController = new teamController();
    this.playerController = new playerController();
>>>>>>> a330244de1378098a2d5b034b52d2491d2d7bcd4
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
<<<<<<< HEAD
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
=======

// <---------------series----------------------->

  getSeries(req:any, res:any){
    this.seriesController.getSeries(req,res)
  }


  //<------------------team------------------------->
 getTeam(req:any, res:any){
  this.teamController.getTeam(req,res)
 }

 //<--------------------player---------------------->

 getPlayer(req:any, res:any){
  this.playerController.getPlayer(req,res)
 }

>>>>>>> a330244de1378098a2d5b034b52d2491d2d7bcd4
}