import { commentory, login, match, getComment , register, sendOtp, verifyOtp } from "../core/validation/schema";
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
      {
        path: "/user/v1/contact",
        component: [
          routingComponents.contact.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/subscribe/notification",
        component: [
          this.tokenController.auth(["user"]),
          routingComponents.subscribeToNotification.bind(routingComponents)
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
        path: "/user/v1/register",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateBodyData(register),
          routingComponents.UseRregister.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/send/otp",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(sendOtp),
          routingComponents.genrateOtp.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/verify/otp",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(verifyOtp),
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

      //Drvices
      {
        path: "/user/v1/register/device",
        component: [

          this.tokenController.auth(["user"]),
          routingComponents.registerDevice.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/post/query",
        component: [

          // this.tokenController.auth(["user"]),
          routingComponents.postQuery.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/add/comment",
        component: [
          routingComponents.addComment.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/update/comment",
        component: [
          routingComponents.updateComment.bind(routingComponents)
        ]
      },

            // <-------------------Reel Like ----------------->

      {
          path: "/user/v1/add/like",
          component: [
            routingComponents.addLike.bind(routingComponents)
          ]
      },
      
      {
        path: "/user/v1/update/like",
        component: [
          routingComponents.updateLike.bind(routingComponents)
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
      // {
      //   path: "/user/v1/alluser",
      //   component: [
      //     // this.tokenController.verifyToken,
      //     this.tokenController.auth(["user"]),
      //     routingComponents.findAllUSer.bind(routingComponents)
      //   ]
      // },

      // <----------------Comments -------------------------->

      {
        path: "/user/v1/get/comment",
        component: [
          this.apiValidation.validateQueryData(getComment),
          routingComponents.getCommentByReelid.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/get/comment/commentid",
        component: [
          routingComponents.getCommentByCommentId.bind(routingComponents)
        ]
      },

            // <----------------Likes -------------------------->

      {
        path: "/user/v1/get/like/reelid",
        component: [
          routingComponents.getLikeByReelid.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/get/comment/likeid",
        component: [
          routingComponents.getLikeByLikeId.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/notification/list",
        component: [
          this.tokenController.auth(["user"]),
          routingComponents.notificationData.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/get/tournament/month",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getMonthWiseTournament.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/match/detail",
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
        path: "/user/v1/get/user",
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
        path: "/user/v1/get_team",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getTeam.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/all/tournaments",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/tournament/:tou_key",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getTournamentById.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/all/matches",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(match),
          routingComponents.get_match.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/match/fixtures",
        component: [
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
        path: "/user/v1/player/overview",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.get_association_stats.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/tournamentwise/player/stats",
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
        path: "/user/v1/scorecard",
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
        path: "/user/v1/player/info",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.getPlayerInfo.bind(routingComponents)
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
        path: "/user/v1/get/commentory",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(commentory),
          routingComponents.getcommentory.bind(routingComponents)
        ]
      },
      // // not use
      {
        path: "/user/v1/auth/reels",
        component: [
           this.tokenController.auth(["user"]),
          routingComponents.getAllReel.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/reels",
        component: [
          routingComponents.getAllReel.bind(routingComponents)
        ]
      },

      {
        path: "/user/v1/fantasy/points",
        component: [
          //  this.tokenController.auth(["user"]),
          this.apiValidation.validateQueryData(commentory),
          routingComponents.fantasy_points.bind(routingComponents)
        ]
      },
      {
        path: "/user/v1/get/all/news",
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
        path: "/user/v1/user/profile",
        component: [
          //  this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          routingComponents.updateUserByAuth.bind(routingComponents)
        ]

      },



      {
        path: "/user/v1/user/profile/image",
        component: [
          //  this.tokenController.verifyToken,
          this.tokenController.auth(["user"]),
          this.upload.array('docs', 1),
          routingComponents.updateUserImage.bind(routingComponents)
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
