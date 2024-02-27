import { login, match, addCommentQuery , getComment  , updateCommentQuery } from "../core/validation/schema";
import { RoutingComponents } from "./routing-components";
import { apiValidation } from "../core/validation/apiValidation";
import { tokenController } from "../core/jwt/jsonwebtoken";
import { upload } from "../core/uploadDocs/DocsController";
import { validData } from "core/validation/validData";
export class AdminAppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  apiValidation: any = apiValidation
  tokenController: tokenController
  upload = upload
  // register = register
  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    this.apiValidation = new apiValidation()
    // this.register = register
    this.tokenController = new tokenController()
    this.upload = upload
    /* Post calls */
    this.AppPostRoutes = [
      {
        path: "/admin/v1/register",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.apiValidation.validateBodyData(login),
          routingComponents.adminregister.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/login",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.apiValidation.validateBodyData(login),
          routingComponents.Adminlogin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/association",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_association.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/association/player/stats",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.get_association_player_stats.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/venues",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_venues.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/countries",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_countries.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/teams/image",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.teamImage.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/tournaments",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_tournaments.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/tournaments/stats/:tou_key",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_tournaments_stats.bind(routingComponents)
        ]
      },
    
      {
        path: "/admin/v1/add/fantasy/points",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_fantasyPoints.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/update/match",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.updateMatch.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/update/tournament",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.update_tournament.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/tournament/points",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.tournament_point.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/tournament/matches",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/update/tournament/matches",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.update_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/match/details",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.detail_matches.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/table",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.table.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/teams",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.add_teams.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/add/reel",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.addReel.bind(routingComponents)
        ]
      },
      // {
      //   path: "/admin/v1/delete/comments",
      //   component: [
      //     //  this.tokenController.auth(["admin"]),
      //     routingComponents.deleteComment.bind(routingComponents)
      //   ]
      // },

      {
        path: "/admin/v1/send/notification",
        component: [
          routingComponents.adminSendNitification.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/update/notification",
        component: [
          routingComponents.updateDevice.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/insert/news",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.insertNews.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1/update/teams/image",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.countriesImage.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1/upload/player/image",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.playerImage.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1/upload/tournament/image",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
          routingComponents.tournamentImage.bind(routingComponents)
        ]

      },
      {
        path: "/admin/v1/update/comment",
        component: [
          // this.apiValidation.validateBodyData(updateCommentBody),
          this.apiValidation.validateQueryData(updateCommentQuery),
          routingComponents.updateComment.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/add/comment",
        component: [
          this.apiValidation.validateQueryData(addCommentQuery),
          routingComponents.addComment.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/delete/comment",
        component: [
          routingComponents.updateComment.bind(routingComponents)
        ]
      },

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
        path: "/admin/v1/get/comment",
        component: [
          this.apiValidation.validateQueryData(getComment),
          routingComponents.getCommentByReelid.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/get/all/tournaments",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.get_tournament.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/get/all/devices",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.findAllDevice.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/match/team/player",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getTeamPlayer.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/tournament/teams",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.tournamentTeams.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/tournament/matches/:tou_key",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getMatchByTournament.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/subscribe/match/:match_key",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.subscribeMatch.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/association/tournaments",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getTournamentByAss.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/association/list",
        component: [
          //  this.tokenController.auth(["admin"]),
          // this.apiValidation.validateQueryData(match),
          routingComponents.getAssociationList.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/test",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.testAPI.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/all/admin",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.findAllAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/userslist",
        component: [
          // this.tokenController.auth(["admin"]),
          routingComponents.findUser.bind(routingComponents)
        ]
      },
      // {
      //   path: "/admin/v1/get/user",
      //   component: [
      //     //  this.tokenController.auth(["admin"]),
      //     routingComponents.findUserByid.bind(routingComponents)
      //   ]
      // },
      {
        path: "/admin/v1/get/user/:phone",
        component: [
          //  this.tokenController.auth(["admin"]),
          // this.apiValidation.validateParams(findbyid),
          routingComponents.userFindById.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/all/reels",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getAllReel.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/all/news",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getNews.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/news/:news_id",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.getNewsById.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/get/all/teams",
        component: [
          //  this.tokenController.auth(["admin"]),
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
        path: "/admin/v1/delete/association",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.deleteAssociation.bind(routingComponents)
        ]
      },

      {
        path: "/admin/v1/delete/tournaments/:tou_key",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.deleteTournamentById.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/update/tournament/status",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.ActiveTournament.bind(routingComponents)
        ]
      },
      // {
      //   path: "/admin/v1/deleteReel",
      //   component: [
      //     //  this.tokenController.auth(["admin"]),
      //     routingComponents.deleteReel.bind(routingComponents)
      //   ]
      // },

   
      {
        path: "/admin/v1/delete/user/:u_id",
        component: [
          //  this.tokenController.auth(["user"]),
          routingComponents.deleteUser.bind(routingComponents)
        ]
      },
    
      {
        path: "/admin/v1/update/admin",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.updateAdmin.bind(routingComponents)
        ]
      },
      {
        path: "/admin/v1/update/user/:phone",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.updateUser.bind(routingComponents)
        ]
      },
      // {
      //   path: "/admin/v1/deleteuser/:phone",
      //   component: [
      //     //  this.tokenController.auth(["admin"]),
      //     routingComponents.deleteAdmin.bind(routingComponents)
      //   ]
      // },
      {
        path: "/admin/v1/update/news/:news_id",
        component: [
          //  this.tokenController.auth(["admin"]),
          this.upload.array("docs", 1),
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
        path: "/admin/v1/delete/news",
        component: [
          //  this.tokenController.auth(["admin"]),
          routingComponents.deleteNews.bind(routingComponents)
        ]
      },

  
      // {
      //   path: "*",
      //   component: [
      //     routingComponents.pageNotFound.bind(routingComponents)
      //   ]
      // }
    ];
  }
}
