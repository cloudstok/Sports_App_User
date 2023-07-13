 import { register } from "../core/validation/schema";
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
        path: "/login",
        component: [
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
          routingComponents.findAllUSer.bind(routingComponents)
        ]
      },
      {
        path: "/userfindbyid/:u_id",
        component: [
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
          routingComponents.showReel.bind(routingComponents)
        ]

      },
      {
         path: "/getNews",
         component : [
          routingComponents.getNews.bind(routingComponents)
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
        path: "/updateuser/:u_id",
        component: [
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
