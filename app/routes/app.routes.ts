import { commentory, login, match, match_fixtures, reel, reelsUpdateBody, reelsUpdateParams, register, sendOtp } from "../core/validation/schema";
import { RoutingComponents } from "./routing-components";
import { apiValidation } from "../core/validation/apiValidation";
import { tokenController } from "../core/jwt/jsonwebtoken";
import { upload } from "../core/uploadDocs/DocsController";
export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  apiValidation: any = apiValidation
  tokenController: tokenController
  upload = upload
  register = register
  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    this.apiValidation = new apiValidation()
    this.register = register
    this.tokenController = new tokenController()
    this.upload = upload
    /* Post calls */
    this.AppPostRoutes = [
      //DEPOSIT

      {
        path: "/user/v1/test",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/register",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateBodyData(register),
          routingComponents.UseRregister.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/send_otp",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(sendOtp),
          routingComponents.genrateOtp.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/verify_otp",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(register),
          routingComponents.verifyOtp.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/login",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateBodyData(login),
          routingComponents.Userlogin.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/addtheme",
        component: [
          // this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          this.upload.array('docs', 3),
          routingComponents.addThemes.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/addUpdateReelStatus/:reel_id",
        component: [
          // this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          this.apiValidation.validateBodyData(reelsUpdateBody),
          this.apiValidation.validateParamsData(reelsUpdateParams),
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
        path: "/user/v1/alluser",
        component: [
          // this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          routingComponents.findAllUSer.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_tournament_by_month",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getMonthWiseTournament.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/match/key",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_matchbykey.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/test",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/userfindbyid",
        component: [
          // this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          routingComponents.userFindByAuth.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/getallthemes",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getAllThemes.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/showReel",
        component: [
          // this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(reel),
          routingComponents.showReel.bind(routingComponents)
        ]

      },
      {
        path: "/user/v1/get_team",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getTeam.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_tournament",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/gettournamentbyid/:tou_key",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getTournamentById.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_match",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(match),
          routingComponents.get_match.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/match/fixtures",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(match_fixtures),
          routingComponents.getMatchFixtures.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_squad",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_squad.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_stats",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_stats.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/get_match_by_tournament",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_match_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/point_table",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.pointTable.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/socrecard",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getsocrecard.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/player",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.players.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/playerImage",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.playersImage.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get_commentory",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(commentory),
          routingComponents.getcommentory.bind(routingComponents)
        ]
      },
      // not use
      {
        path: "/user/v1/fantasy_match_point",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.fantasy.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/fantasy_point",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(commentory),
          routingComponents.fantasy_points.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/getNews",
        component: [
          // this.tokenController.verifyToken,
          //  this.tokenController.auth(["user"]),
          routingComponents.getNews.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/getTeam",
        component: [
          //  this.tokenController.auth(["user"]),
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

      {
        path: "/user/v1/test",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      // 404
      {
        path: "/user/v1/updateuser/profile",
        component: [
          //  this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          routingComponents.updateUserByAuth.bind(routingComponents)
        ]

      },

      {
        path: "/user/v1/updateuser/profile/image",
        component: [
          //  this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          this.upload.array('docs', 1),
          routingComponents.updateUserImage.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/deleteuser/:u_id",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.deleteUser.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/updatetheme/:theme_id",
        component: [
          //  this.tokenController.auth(["user"]),
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
        path: "/user/v1/deletethemes",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.deleteThemes.bind(routingComponents)
        ]
      },
      {
        path: "*",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }
}
