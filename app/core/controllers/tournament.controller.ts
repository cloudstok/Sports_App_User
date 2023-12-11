import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { match } from "./match.controller";

import { uploads3 } from "../aws/uploads3";
// const vinay = "https://jaunpur123.s3.ap-south-1.amazonaws.com/1697093979829_vinay.jpeg"
export class tournament extends ResponseInterceptor {
  connection: connection
  uploads3: uploads3
  constructor() {
    super()
    this.connection = new connection()
    this.uploads3 = new uploads3()
  }

  // ====================== this function find all tournament ======================
  async findAllTournament() {
    try {
      let [allTournament] = await this.connection.write.query('SELECT * FROM tournament');
      return allTournament
    } catch (err) {
      console.log(`Err while getting data from DB is::`, err)
      return false
    }
  }

  async findTournamentbyAssKey(PageLimit, PageOffset, ass_key) {
    try {
      let [allTournament]: any = await this.connection.write.query('SELECT * FROM tournament where association_key = ? and is_deleted = 1 ', [ass_key]);

      for (let x of allTournament) {
        if (new Date(x.start_date * 1000) <= new Date() && new Date(x.last_scheduled_match_date * 1000) >= new Date()) {
          x.is_end = true
          //   console.log(true)
        } else {
          x.is_end = false
          //console.log(false)
        }

      }
      return allTournament
    } catch (err) {
      console.log(`Err while getting data from DB is::`, err)
      return false
    }
  }

  async findTournamentByAss(req, res) {
    try {
      const { PageLimit, PageOffset, ass_key } = req.query
      let tournamentData: any = await this.findTournamentbyAssKey(PageLimit, PageOffset, ass_key);
      return this.sendSuccess(res, { data: tournamentData })

    } catch (err) {
      console.error(`Err while getting tournament data is::`, err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


  async findMonthWiseTournament(req, res) {
    try {
      let tournamentData: any = await this.findAllTournament();
      let finalData = [];
      var month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
      let years = []
      // var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      tournamentData.map(e => {
        let date = new Date(e.start_date * 1000)
        let key = month[new Date(date).getMonth() + 1] + " " + new Date(date).getFullYear();
        if (!years.includes(new Date(date).getFullYear())) {
          years.push(new Date(date).getFullYear())
        }
        let finalObj = {
          "month": key,
          "data": [e]
        }
        let keyCheck = finalData.find(e => e.month === key)
        if (keyCheck) {
          keyCheck.data.push(e)
        } else {
          finalData.push(finalObj)
        }
      })
      return this.sendSuccess(res, { data: finalData, years: years })
    } catch (err) {
      console.log(`Err while getting tournament data is::`, err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async addImageTournament(req: any, res: any) {
    try {
      let url = '';
      if (req.files && req.files.length > 0) {
        let imageUrl = await this.uploads3.uploadImage(req.files)
        url = imageUrl.Location
        // console.log(url)
      }
      // console.log(url, req.query.tou_key)
      const sql = "UPDATE tournament SET imgURl = ?  where tou_key = ?"
      await this.connection.write.query(sql, [url, req.query.tou_key])
      this.sendSuccess(res, { status: true, msg: ' image uploaded  successfully' })
    } catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


  async get_tournament(req: any, res: any) {
    try {
      // let sql = "select  * from tournament where last_scheduled_match_date >=  current_date() order by tou_key desc"
      let sql = "SELECT * FROM tournament where is_deleted = 1  and is_Active = 1 order by last_scheduled_match_date DESC"
      let [tournament] = await this.connection.write.query(sql);
      return this.sendSuccess(res, { data: tournament })
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }
  async imageURL(code) {
    let country = "select * from countries where code = ? "
    let [countries] = await this.connection.write.query(country, [code])
    if (countries && countries[0]?.['imgURl'] !== undefined) {
      return countries[0]?.['imgURl']
    } else {
      return ""
    }
  }


  // 

  async playerImage(player_key) {
    try {
      let sql = "select  image from players where player_key = ?"
      let [image]: any = await this.connection.write.query(sql, [player_key]);
      return image[0]?.image
    }
    catch (err) {
      console.log(err)
    }
  }


  async createTeam(t, p) {
    try {
      t = Object.values(t)
      t = [...new Map(t.map(item => [item['key'], item])).values()]
      p = Object.values(p)
      p = p.map(e => (
        { key: e.key, name: e.name, role: e.roles, nationality: e.nationality }))
      p = [...new Map(p.map(item => [item['key'], item])).values()]
      let w = []
      for (let x of t) {
        let sp = {
          bt: [],
          bo: [],
          ar: [],
          wc: []
        }
        // x.image = await this.imageURL(x.code)
        for (let y of p) {
          y.image = await this.playerImage(y.key) || process.env.vinay
          if (x.country_code === y.nationality.code) {
            if (y.role[0] === "batsman") {
              sp.bt.push(y)
            } if (y.role[0] === "all_rounder") {
              sp.ar.push(y)
            } if (y.role[0] === "bowler") {
              sp.bo.push(y)
            }
            if (y.role[0] === "keeper") {
              sp.wc.push(y)
            }
          }
        }
        x.players = sp
        w.push(x)
      }
      return w
    } catch (err) {
      console.log(err)
    }
  }

  async deleteTournamentById(req: any, res: any) {
    try {
      await this.connection.write.query(`UPDATE tournament SET is_deleted = 0 WHERE tou_key = '${req.params.tou_key}'`);

      await this.connection.write.query(`  UPDATE cricket_match SET is_deleted = 0 WHERE tou_key = '${req.params.tou_key}'`);

      return this.sendSuccess(res, { status: 'success', msg: "Tournament & match deleted successful" })

    } catch (err) {
      console.error(`Error while deleting tournament is::::`, err);
      return this.sendInternalError(res, 'Something went wrong with the request')
    }
  }


  async ActiveTournament(req: any, res: any) {
    try {
      const { value, tou_key } = req.query
      // console.log(value, tou_key) 
      await this.connection.write.query(`UPDATE tournament SET is_Active = ${value} WHERE tou_key = '${tou_key}'`);
      await this.connection.write.query(`  UPDATE cricket_match SET is_Active = ${value} WHERE tou_key = '${tou_key}'`);
      if (+value) {
        return this.sendSuccess(res, { status: 'success', msg: "Tournament Active successful" })
      } else {
        return this.sendSuccess(res, { status: 'success', msg: "Tournament Deactive successful" })
      }
    } catch (err) {
      console.error(`Error while deleting tournament is::::`, err);
      return this.sendInternalError(res, 'Something went wrong with the request')
    }
  }



  async getTournamentById(req: any, res: any) {
    try {
      let sql = "select * from tournament as tr inner join cricket_match as cm on cm.tou_key = tr.tou_key  where tr.tou_key = ? order by start_at desc"
      let [tournament]: any = await this.connection.write.query(sql, [req.params.tou_key]);
      let finalData = {};
      let matchData = []
      let teams = [];
      let players = [];
      // let teams: any;
      for (let element of tournament) {
        finalData['tournamentKey'] = element?.tou_key ?? "",
          finalData['tournamentName'] = element?.tou_name ?? ""
        finalData['shortName'] = element?.short_name ?? "",
          finalData['countries'] = element?.countries ?? ""
        finalData['startDate'] = element.start_date,
          finalData['gender'] = element?.gender ?? "",
          finalData['pointSystem'] = element?.point_system ?? ""
        finalData['competition'] = element?.competition ?? "",
          finalData['associationKey'] = element?.association_key ?? "",
          finalData['sport'] = element?.sport ?? "",
          finalData['isDateConfirmed'] = element?.is_date_confirmed ?? "",
          finalData['isVenueConfirmed'] = element?.is_venue_confirmed ?? "",
          finalData['lastScheduledMatchDate'] = element?.last_scheduled_match_date,
          finalData['formats'] = element?.formats,
          finalData['teamsDetails'] = {
            // teams: Object.values(element?.teams?? {}),
            rounds: element?.rounds ?? "",
            tournamentPoints: element?.tou_points ?? "",
          };
        // console.log(element.tou_points)
        // if (finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points) {
        //   console.log(finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points)
        //   for (let e of finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points) {
        //     // console.log(e)
        //     let url = await this.imageURL(e?.team?.code) || process.env.country || "vishal"
        //     e.team.url = url
        //       // delete e.team

        //   }
        // }
        // console.log(finalData['teamsDetails']['tournamentPoints'][0]?.groups[0].points)

        for (let x of finalData['teamsDetails']['tournamentPoints']) {
          if (x.tournament_round.name === 'Knockout') {
            finalData['teamsDetails']['tournamentPoints'].shift()
          }
        }

        // if(element.play){

        // }


        element.team.a.url = await this.imageURL(element?.team?.a?.code) || process.env.country
        element.team.b.url = await this.imageURL(element?.team?.b?.code) || process.env.country
        element.team.a.match_key = element?.match_key
        element.team.b.match_key = element?.match_key
        matchData.push({
          match_key: element?.match_key ?? "",
          subTitle: element?.sub_title ?? "",
          status: element?.status ?? "",
          start_at: element.start_at,
          winner: element?.winner ?? "",
          team: element?.team ?? "",
          venue: element?.venue ?? "",
          messages: element?.messages ?? " ",
          format: element?.format ?? " ",
          toss: element?.toss ?? "",
          estimatedEndDate: element?.estimated_end_date ?? "",
          completedDateApproximate: element?.completed_date_approximate ?? "",
          umpires: element?.umpires ?? "",
          weather: element?.weather ?? "",
          play: {
            result: element?.play?.result,
            target: element?.play?.target,
            innings: {
              a_1: { index: element?.play?.innings['a_1'].index, overs: element?.play?.innings['a_1'].overs, score: element?.play?.innings['a_1'].score, wickets: element?.play?.innings['a_1'].wickets },
              b_1: { index: element?.play?.innings['b_1'].index, overs: element?.play?.innings['b_1'].overs, score: element?.play?.innings['b_1'].score, wickets: element?.play?.innings['b_1'].wickets }
            }
          }
        });
        if (element.players) {
          (Object.values(element?.players ?? {})).map((e: any) => {
            players.push(e?.player)
          })
        }
        if (element.team) {
          teams.push(...Object.values(element?.team ?? {}))
        }
      };


      if (teams.length > 0) {
        let team: any = await this.createTeam(teams, players) || []
        teams = [...new Map(teams.map(item => [item['key'], item])).values()]
        finalData['teamsDetails']['teams'] = team
      }
      finalData['teamsDetails'] ? finalData['teamsDetails']['matches'] = matchData : {}
      if (finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points) {
        for (let e of finalData['teamsDetails']['tournamentPoints'][0]?.groups[0]?.points) {
          let url = await this.imageURL(e?.team?.code) || process.env.country || "vishal"
          e.team.url = url
        }
      }
      return this.sendSuccess(res, { data: finalData })
    }
    catch (err) {
      console.error(err)
      this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
  }


  async tournamentTeams(req: any, res: any) {
    try {
      const sql = "SELECT teams FROM tournament where tou_key = ?  and is_deleted = ?"

      let [team]: any = await this.connection.write.query(sql, [req.query.tou_key, 1])

      team = team[0].teams
      if (team != null) {
        team = Object.values(team)
        for (let x of team) {

          x.imageURL = await this.imageURL(x.code)
        }
      }

      return this.sendSuccess(res, { data: team })

    } catch (err) {
      console.error(`Error while deleting tournament is::::`, err);
      return this.sendInternalError(res, 'Something went wrong with the request')
    }
  }

}

