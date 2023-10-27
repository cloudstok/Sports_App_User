import { findbyid, register } from "../core_admin/validation/schema";
import { RoutingComponents } from "./admin-routing-components";
import { apiValidation } from "../core_admin/validation/apiValidation";
import { tokenController } from "../core/jwt/jsonwebtoken";
import { upload } from "../core_admin/uploadDocs/DocsController";
export class AdminAppRoutes {
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
      {
        path: "/admin/v1//register",
        component: [
          this.apiValidation.validate(register),
          routingComponents.register.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//login",
        component: [
          this.apiValidation.validate(register),
          routingComponents.login.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_association",
        component: [
          routingComponents.add_association.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_venues",
        component: [
          routingComponents.add_venues.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_countries",
        component: [
          routingComponents.add_countries.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_tournaments",
        component: [
          routingComponents.add_tournaments.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//tournaments/stats/:tou_key",
        component: [
          routingComponents.add_tournaments_stats.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add/fanstasy/points",
        component: [
          routingComponents.add_fantasyPoints.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//update_tournament",
        component: [
          routingComponents.update_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//tournament_point",
        component: [
          routingComponents.tournament_point.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_matches",
        component: [
          routingComponents.add_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//update_matches",
        component: [
          routingComponents.update_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//detail_matches",
        component: [
          routingComponents.detail_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//table",
        component: [
          routingComponents.table.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//add_teams",
        component: [
          routingComponents.add_teams.bind(routingComponents)
        ]
      },
  
      {
        path: "/admin/v1//addReel",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.addReel.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1//insertNews",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.insertNews.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1//countriesImage",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.countriesImage.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1//playerImage",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.playerImage.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1//tournamentImage",
        component: [
          this.upload.array("docs" , 1),
          routingComponents.tournamentImage.bind(routingComponents)
        ]

      }

      // // 404
      // {
      //   path: "*",
      //   component: [
      //     routingComponents.pageNotFound.bind(routingComponents)
      //   ]
      // }


    ];

    /* Get call */
    this.AppGetRoutes = [
      // 404
      {
        path: "/admin/v1/test",
        component: [
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/alladmin",
        component: [
          routingComponents.findAllAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/findUser",
        component: [
          routingComponents.findUser.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/findUserByid",
        component: [
          routingComponents.findUserByid.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/findbyid/:phone",
        component: [
          this.apiValidation.validateParams(findbyid),
          routingComponents.userFindById.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/showReel",
        component : [
          routingComponents.showReel.bind(routingComponents)
        ]
      },
      {
          path: "/admin/v1/getNews",
          component: [
            routingComponents.getNews.bind(routingComponents)
          ]
      },
      {
        path: "/admin/v1/getNewsById",
        component: [
          routingComponents.getNewsById.bind(routingComponents)
        ]
    },
    {
      path: "/admin/v1/addTeam",
      component: [
        routingComponents.addTeam.bind(routingComponents)
      ]
  }

    

      // {
      //   path: "*",
      //   component: [
      //     routingComponents.pageNotFound.bind(routingComponents)
      //   ]
      // },
    ];
    // update  request
    this.AppUpdateRoutes = [
      // 404
      {
        path: "/admin/v1/updateuser/:phone",
        component: [
          routingComponents.updateAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/deleteuser/:phone",
        component: [
          routingComponents.deleteAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/updateNews/:news_id",
        component: [
          routingComponents.updateNews.bind(routingComponents)
        ]
      }
      // {
      //   path: "*",
      //   component: [
      //     routingComponents.pageNotFound.bind(routingComponents)
      //   ]
      // },
      
    ];

    // delete requests
    this.AppDeleteRoutes = [
      // 404
      {
        path: "/admin/v1/deleteNews",
        component: [
          routingComponents.deleteNews.bind(routingComponents)
        ]
      }
      // {
      //   path: "*",
      //   component: [
      //     routingComponents.pageNotFound.bind(routingComponents)
      //   ]
      // }
    ];
  }
}
