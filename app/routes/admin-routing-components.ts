import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { admin } from "../core_admin/controllers/adminController";
import { reelController } from "../core_admin/controllers/reelController";
import {News} from "../core_admin/controllers/newsController";
import {static_data} from '../core_admin/controllers/Static_Data/static_data'
import { teamController } from "../core_admin/controllers/teamController";
import { API_TO_INTEGRATE} from '../core_admin/controllers/API_TO_INTEGRATE/api_to_integrate'
import { countries } from "../core_admin/controllers/countries/countries";
import { tournament } from "../core_admin/controllers/tournament/tournamentController";
import { playerController } from "../core_admin/controllers/playerController";
import {user} from '../core/controllers/userController'
export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  admin: admin
  reels: reelController
  news : News
  static_data :static_data
  teamController : teamController
  user :user
  API_TO_INTEGRATE :API_TO_INTEGRATE
  countries : countries
  tournament : tournament
  player: playerController

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.admin = new admin();
    this.reels = new reelController();
    this.news = new News();
    this.static_data = new static_data()
    this.teamController = new teamController();
    this.API_TO_INTEGRATE = new API_TO_INTEGRATE();
    this.countries = new countries()
    this.tournament = new tournament()
    this.player = new playerController();
    this.user = new user()
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
    this.admin.register(req, res)
  }
  login(req : any, res : any){
    this.admin.login(req, res)
  }
  findAllAdmin(req: any, res : any){
    this.admin.findAllAdmin(req, res)
  }
  findUser(req: any, res : any){
    this.user.findAllUsers(req, res)
  }
  findUserByid(req: any, res : any){
    this.user.findById(req, res)
  }
  updateAdmin(req:any, res :any){
    this.admin.updateAllAdmin(req, res)
  }
  updateUser(req:any, res :any){
    this.user.updateAllUser(req, res)
  }
  deleteUser(req:any, res :any){
    this.user.DeleteUser(req, res)
  }
  deleteAdmin(req:any, res :any){
    this.admin.DeleteAdmin(req, res)
  }
  userFindById(req:any, res :any){
    this.admin.findById(req, res)
  }

  //------------------association -----------------------------------
  add_association(req :any , res:any){
    this.static_data.add_association(req ,res)
  }
  add_venues(req :any , res:any){
    this.static_data.add_venues(req ,res)
  }
  add_countries(req :any , res:any){
    this.static_data.add_countries(req ,res)
  }
  countriesImage(req :any , res:any){
    this.countries.uploadImage(req ,res)
  }
  playerImage(req :any , res:any){
    this.player.addplayerImage(req ,res)
  }
  tournamentImage(req :any , res:any){
    this.tournament.addImageTournament(req ,res)
  }
  add_tournaments(req :any , res:any){
    this.API_TO_INTEGRATE.add_tournaments(req ,res)
  }
  add_tournaments_stats(req :any , res:any){
    this.player.addStats(req ,res)
  }
  add_fantasyPoints(req :any , res:any){
    this.API_TO_INTEGRATE.fantasy_matchPoints(req ,res)
  }
  update_tournament(req :any , res:any){
    this.API_TO_INTEGRATE.update_tournaments(req ,res)
  }
  tournament_point(req :any , res:any){
    this.API_TO_INTEGRATE.tournaments_point_table(req ,res)
  }
  add_matches(req :any , res:any){
    this.API_TO_INTEGRATE.add_matches(req ,res)
  }
  update_matches(req :any , res:any){
    this.API_TO_INTEGRATE.update_matches(req ,res)
  }
  detail_matches(req :any , res:any){
    this.API_TO_INTEGRATE.detail_match(req ,res)
  }
  add_teams(req :any , res:any){
    this.API_TO_INTEGRATE.add_teams(req ,res)
  }
  table(req :any , res:any){
    this.API_TO_INTEGRATE.table(req ,res)
  }
  //<---------------reels---------------->

  addReel(req : any, res: any){
    this.reels.addReel(req, res)
  }
  showReel(req : any , res : any){
    this.reels.showReel(req,res)
  }

  //<--------------News-------------->
  getNews(req : any, res: any){
    this.news.getNews(req,res)
  }

  getNewsById(req:any, res:any){
    this.news.getNewsById(req,res)
  }

  insertNews(req:any, res:any){
    this.news.insertNews(req,res)
  }

  updateNews(req:any, res: any){
    this.news.updateNews(req,res)
  }

  deleteNews(req:any, res:any){
    this.news.deleteNews(req, res)
  }

// <------------------Series------------------->





//<-----------------Teams------------------------>

addTeam(req:any, res: any){
  this.teamController.get_team(req,res)
}

//<-----------------Player------------------->


  // <----------------Teams-------------------->


  // <----------------Players-------------------->


  }