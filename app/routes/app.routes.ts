 import { login, reel, register } from "../core/validation/schema";
import { RoutingComponents } from "./routing-components";
import { apiValidation } from "../core/validation/apiValidation";
import { tokenController } from "../core/jwt/jsonwebtoken";
import { upload } from "../core/uploadDocs/DocsController";
export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  apiValidation :any = apiValidation
  tokenController : tokenController
  upload = upload
  register = register
    constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
     this.apiValidation = new apiValidation()
     this.register = register
     this.tokenController = new tokenController()
      this .upload = upload
    /* Post calls */
    this.AppPostRoutes = [
      //DEPOSIT
      {
        path: "/test",
        component: [
          this.apiValidation.validateBodyData(register),
          this.apiValidation.validateParamsData(register),
          this.apiValidation.validateQueryData(register),
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/register",
        component: [
          this.apiValidation.validateBodyData(register),
          routingComponents.register.bind(routingComponents)
        ]
      },
      {
        path: "/send_otp",
        component: [
          // this.apiValidation.validateBodyData(register),
          routingComponents.genrateOtp.bind(routingComponents)
        ]
      },
      {
        path: "/verify_otp",
        component: [
          // this.apiValidation.validateBodyData(register),
          routingComponents.verifyOtp.bind(routingComponents)
        ]
      },
      {
        path: "/login",
        component: [
          this.apiValidation.validateBodyData(login),
          routingComponents.login.bind(routingComponents)
        ]
      },
      
      {
        path: "/addtheme",
        component : [
          this.tokenController.verifyToken,
          this.upload.array('docs' , 3),
          routingComponents.addThemes.bind(routingComponents)
        ]
      },
      {
        path: "/addUpdateReelStatus/:reel_id",
        component : [
          this.tokenController.verifyToken,
          routingComponents.addUpdateReelStatus.bind(routingComponents)
        ]
      },


      // 404
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }


    ];

    /* Get call */
    this.AppGetRoutes = [
      // 404
      {
        path: "/alluser",
        component: [
          this.tokenController.verifyToken,
          routingComponents.findAllUSer.bind(routingComponents)
        ]
      },
      {
        path: "/userfindbyid/:u_id",
        component: [
          this.tokenController.verifyToken,
          routingComponents.userFindById.bind(routingComponents)
        ]
      },
      {
        path: "/getallthemes",
        component: [
          routingComponents.getAllThemes.bind(routingComponents)
        ]
      },
      {
        path: "/showReel",
        component : [
          this.tokenController.verifyToken,
          this.apiValidation.validateQueryData(reel),
          routingComponents.showReel.bind(routingComponents)
        ]

      },
      {
        path: "/get_team",
        component : [
          routingComponents.getTeam.bind(routingComponents)
        ]
      },
      {
        path: "/get_tournament",
        component : [
          routingComponents.get_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/get_match",
        component : [
          routingComponents.get_match.bind(routingComponents)
        ]
      },
      {
        path: "/point_table",
        component : [
          routingComponents.pointTable.bind(routingComponents)
        ]
      },
      {
         path: "/getNews",
         component : [
          // this.tokenController.verifyToken,
          routingComponents.getNews.bind(routingComponents)
         ]
      },
     
     {
      path: "/getTeam",
      component : [
       routingComponents.getTeam.bind(routingComponents)
      ]
   },
  
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      },
    ];
    // update  request
    this.AppUpdateRoutes = [
      // 404
      {
        path: "/change_password",
        component: [
          //  this.tokenController.verifyToken,
          routingComponents.updateUser.bind(routingComponents)
        ]
      },
      {
        path: "/deleteuser/:u_id",
        component: [
          routingComponents.deleteUser.bind(routingComponents)
        ]
      },
      {
        path: "/updatetheme/:theme_id",
        component: [
          routingComponents.updateTheme.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      },
    ];

    // delete requests
    this.AppDeleteRoutes = [
      // 404
      {
        path: "/deletethemes",
        component: [
          routingComponents.deleteThemes.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }
}
