import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { user } from "../core/controllers/userController";
import { ThemeController } from "../core/controllers/themes.controller";
import { reel } from "../core/controllers/reel.controller";
import { teamController } from '../core/controllers/team.controller'
import { tournament } from "../core/controllers/tournament.controller";
import { match } from "../core/controllers/match.controller";
import { otpController } from "../core/controllers/otp.controller";
import { playerController } from "../core/controllers/player.controller";
import { statsController } from "../core/controllers/stats.controller";
import { Association } from "../core/controllers/associationController";
import { squadController } from "../core/controllers/squad.controller";

//.admin
// import { ResponseInterceptor } from "../core/utilities/response-interceptor";
// import { TestController } from "../core/controllers/test.controller";
import { admin } from "../core/controllers/adminController";
// import { reel } from "../core/controllers/reel.controller";
import { News } from "../core/controllers/newsController";
import { static_data } from '../core/controllers/Static_Data/static_data'
// import { teamController } from "../core/controllers/team.controller";
import { API_TO_INTEGRATE } from '../core/controllers/API_TO_INTEGRATE/api_to_integrate'
import { countries } from "../core/controllers/countries";
// import { tournament } from "../core/controllers/tournament.controller";
import { players } from "../core/controllers/playerController";
// import {user} from '../core/controllers/userController'
export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  user: user
  theme: ThemeController
  reel: reel
  teamController: teamController
  tournament: tournament
  match: match
  otpController: otpController
  player: playerController
  stats: statsController
  squad: squadController
  playerslist: players
  admin: admin
  reels: reel
  news: News
  static_data: static_data
  API_TO_INTEGRATE: API_TO_INTEGRATE
  countries: countries
  association: Association;
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
    this.player = new playerController()
    this.stats = new statsController()
    this.squad = new squadController()
    this.test = new TestController();
    this.admin = new admin();
    this.reels = new reel();
    this.news = new News();
    this.static_data = new static_data()
    this.teamController = new teamController();
    this.API_TO_INTEGRATE = new API_TO_INTEGRATE();
    this.countries = new countries()
    this.tournament = new tournament()
    this.playerslist = new players();
    this.user = new user();
    this.association = new Association();
  }

  /**
    *  page not found.  
   */

  testAPI(req: any, res: any) {
    this.test.test(req, res,)
  }
  UseRregister(req: any, res: any) {
    this.user.register(req, res)
  }
  genrateOtp(req: any, res: any) {
    this.otpController.genrateOtp(req, res)
  }
  verifyOtp(req: any, res: any) {
    this.otpController.verifyOtp(req, res)
  }
  Userlogin(req: any, res: any) {
    this.user.login(req, res)
  }
  findAllUSer(req: any, res: any) {
    this.user.findAllUsers(req, res)
  }
  updateUserByAuth(req: any, res: any) {
    this.user.updateUserByAuth(req, res)
  }
  updateUserImage(req: any, res: any) {
    this.user.profileImage(req, res)
  }
  // deleteUser(req:any, res :any){
  //   this.user.DeleteUser(req, res)
  // }
  userFindByAuth(req: any, res: any) {
    this.user.findById(req, res)
  }

  // <-----------------for themes------------------->
  addThemes(req: any, res: any) {
    this.theme.addThemes(req, res)
  }

  getAllThemes(req: any, res: any) {
    this.theme.showThemes(req, res)
  }
  updateTheme(req: any, res: any) {
    this.theme.updateThemes(req, res)
  }
  deleteThemes(req: any, res: any) {
    this.theme.deleteThemes(req, res)
  }

  //-------------------reels------------------------->
  showReel(req: any, res: any) {
    this.reel.showReel(req, res)
  }
  addUpdateReelStatus(req: any, res: any) {
    this.reel.addUpdateReelStatus(req, res)
  }
  //--------------------News------------------------>
  // getNews(req:any, res: any){
  //   this.reel.getNews(req,res)
  // }
  getTeam(req: any, res: any) {
    this.teamController.get_team(req, res)
  }
  get_tournament(req: any, res: any) {
    this.tournament.get_tournament(req, res)
  }
  getTournamentById(req: any, res: any) {
    this.tournament.getTournamentById(req, res)
  }
  get_match(req: any, res: any) {
    this.match.get_match(req, res)
  }

  get_matchbykey(req: any, res: any) {
    this.match.finddetailsby_match_key(req, res)
  }
  getMatchFixtures(req: any, res: any) {
    this.match.getMatchFxitures(req, res)
  }
  get_squad(req: any, res: any) {
    this.squad.getSquad(req, res)
  }
  get_stats(req: any, res: any) {
    this.stats.get_stats(req, res)
  }

  get_match_tournament(req: any, res: any) {
    this.match.get_match_tournament(req, res)
  }
  getcommentory(req: any, res: any) {
    this.player.getcommentory(req, res)
  }
  getsocrecard(req: any, res: any) {
    this.player.getsocrecard(req, res)
  }
  players(req: any, res: any) {
    this.player.getPlayerbyId(req, res)
  }
  playersImage(req: any, res: any) {
    this.player.findPlayerImage(req, res)
  }
  pointTable(req: any, res: any) {
    this.match.point_table(req, res)
  }
  fantasy(req: any, res: any) {
    this.match.fantasy_match_point(req, res)
  }
  fantasy_points(req: any, res: any) {
    this.match.fantasy_point(req, res)
  }

  // ADMIN 

  pageNotFound(req: any, res: any,) {
    this.responseInterceptor.sendError(res, 404, "InvalidURI", "Requested URL is invalid. Please try again");
  }
  adminregister(req: any, res: any) {
    this.admin.register(req, res)
  }
  Adminlogin(req: any, res: any) {
    this.admin.login(req, res)
  }
  findAllAdmin(req: any, res: any) {
    this.admin.findAllAdmin(req, res)
  }
  findUser(req: any, res: any) {
    this.user.findAllUsers(req, res)
  }
  findUserByid(req: any, res: any) {
    this.user.findByIds(req, res)
  }
  updateAdmin(req: any, res: any) {
    this.admin.updateAllAdmin(req, res)
  }
  updateUser(req: any, res: any) {
    this.user.updateAllUsers(req, res)
  }
  deleteUser(req: any, res: any) {
    this.user.DeleteUser(req, res)
  }
  deleteAdmin(req: any, res: any) {
    this.admin.DeleteAdmin(req, res)
  }
  userFindById(req: any, res: any) {
    this.admin.findById(req, res)
  }

  //------------------association -----------------------------------
  add_association(req: any, res: any) {
    this.static_data.add_association(req, res)
  }
  add_venues(req: any, res: any) {
    this.static_data.add_venues(req, res)
  }
  add_countries(req: any, res: any) {
    this.static_data.add_countries(req, res)
  }
  countriesImage(req: any, res: any) {
    this.countries.uploadImage(req, res)
  }
  playerImage(req: any, res: any) {
    this.playerslist.addplayerImage(req, res)
  }
  tournamentImage(req: any, res: any) {
    this.tournament.addImageTournament(req, res)
  }
  add_tournaments(req: any, res: any) {
    this.API_TO_INTEGRATE.add_tournaments(req, res)
  }
  add_tournaments_stats(req: any, res: any) {
    this.playerslist.addStats(req, res)
  }
  add_fantasyPoints(req: any, res: any) {
    this.API_TO_INTEGRATE.fantasy_matchPoints(req, res)
  }
  update_tournament(req: any, res: any) {
    this.API_TO_INTEGRATE.update_tournaments(req, res)
  }
  tournament_point(req: any, res: any) {
    this.API_TO_INTEGRATE.tournaments_point_table(req, res)
  }
  add_matches(req: any, res: any) {
    this.API_TO_INTEGRATE.add_matches(req, res)
  }
  update_matches(req: any, res: any) {
    this.API_TO_INTEGRATE.update_matches(req, res)
  }
  detail_matches(req: any, res: any) {
    this.API_TO_INTEGRATE.detail_match(req, res)
  }
  add_teams(req: any, res: any) {
    this.API_TO_INTEGRATE.add_teams(req, res)
  }
  table(req: any, res: any) {
    this.API_TO_INTEGRATE.table(req, res)
  }
  //<---------------reels---------------->

  addReel(req: any, res: any) {
    this.reels.addReel(req, res)
  }
  showReels(req: any, res: any) {
    this.reels.showReels(req, res)
  }


  deleteReel(req: any, res: any) {
    this.reels.deleteReel(req, res)
  }
  //<--------------News-------------->
  getNews(req: any, res: any) {
    this.news.getNews(req, res)
  }

  getMonthWiseTournament(req: any, res: any) {
    this.tournament.findMonthWiseTournament(req, res)
  }
  getTournamentByAss(req: any, res: any) {
    this.tournament.findTournamentByAss(req, res)
  }

  getAssociationList(req: any, res: any) {
    this.association.associationList(req, res)
  }

  getNewsById(req: any, res: any) {
    this.news.getNewsById(req, res)
  }

  insertNews(req: any, res: any) {
    this.news.insertNews(req, res)
  }

  updateNews(req: any, res: any) {
    this.news.updateNews(req, res)
  }

  deleteNews(req: any, res: any) {
    this.news.deleteNews(req, res)
  }

  // <------------------Series------------------->





  //<-----------------Teams------------------------>

  addTeam(req: any, res: any) {
    this.teamController.get_team(req, res)
  }
}