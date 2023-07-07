import { ResponseInterceptor } from "../core/utilities/response-interceptor";
import { TestController } from "../core/controllers/test.controller";
import { user } from "../core/controllers/userController";
import { ThemeController } from "../core/controllers/themes.controller"

export class RoutingComponents {
  responseInterceptor: ResponseInterceptor;
  test: TestController
  user: user
  theme: ThemeController
  

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.test = new TestController();
    this.user = new user();
    this.theme = new ThemeController();
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
}