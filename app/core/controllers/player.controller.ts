import { SQL_GET_PLAYER } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
// import { set } from "mongoose";

export class playerController extends ResponseInterceptor {
    connection: connection
    constructor() {
        super()
        this.connection = new connection();
    }

    async getPlayerByRoles(players, batting_order, bowling_order) {
        let finalData: any = {}
        let batsman = [];
        let bowler = [];
        let allRounder = [];
        let a = []
        for (let x of players) {
            if (x.player.roles[0] === 'all_rounder') {
                allRounder.push(x)
            }
            // console.log(bowling_order.includes(x.player.key),x.player.key,x.player.roles[0])
            a.push(x.player.key)
            if (bowling_order.includes(x.player.key)) {
                let index = bowling_order.findIndex(e => e === x.player.key)
                bowler[index] = x

            } if (batting_order.includes(x.player.key)) {
                let battingIndex = batting_order.findIndex(e => e === x.player.key);
                batsman[battingIndex] = x
            }

        }
        // console.log(a  , "a", bowling_order , "bowling_order" ,  batting_order  , "batting_order")
        finalData.batsman = batsman;
        finalData.bowler = bowler;
        finalData.allRounder = allRounder;
        return finalData
    }

    async getsocrecard(req: any, res: any) {
        try {

            let [player]: any = await this.connection.write.query(SQL_GET_PLAYER, [req.query.match_key]);
               if (player[0].status == "not_started") {
                return this.sendSuccess(res, { message: "this match is not completed" })
            }
          const data = await this.socrcard(player)
            return this.sendSuccess(res, { data: data })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }


// emit socrcard

async socrcard(player){
    let data: any = {}
    let teamA = player[0]?.team?.a
    let teamB = player[0]?.team?.b
    let players = Object.values(player[0]?.players)
    let teamAplayer = players?.filter((e: any) => e?.player?.nationality?.code == teamA.country_code)
    let teamBplayer = players?.filter((e: any) => e?.player?.nationality?.code == teamB.country_code)

    player[0].team.a.score = player[0]?.play?.innings['a_1']
    player[0].team.b.score = player[0]?.play?.innings['b_1']
    let o = {
        'batting_order_A': player[0]?.play?.innings['a_1']?.batting_order,
        'batting_order_B': player[0]?.play?.innings['b_1']?.batting_order,
        'bowling_order_A': player[0]?.play?.innings['a_1']?.bowling_order,
        'bowling_order_B': player[0]?.play?.innings['b_1']?.bowling_order,
    }
    data.nationality = Object.values(player[0].team);
    let partnerships1: any = player[0]?.play?.innings['a_1']['partnerships']
    let partnerships2: any = player[0]?.play?.innings['b_1']['partnerships']
    data.teamA = await this.getPlayerByRoles(teamAplayer, o.batting_order_A, o.bowling_order_A)
    data.teamB = await this.getPlayerByRoles(teamBplayer, o.batting_order_B, o.bowling_order_B)
    data.teamB.partnerships = partnerships2
    data.teamA.partnerships = partnerships1
    data.teamA.extraRun = data?.nationality[0]?.score?.extra_runs
    data.teamB.extraRun = data?.nationality[1]?.score?.extra_runs
    delete data?.nationality[0]?.score?.extra_runs;
    delete data?.nationality[1]?.score?.extra_runs;
      return data
}





    async getcommentory(req: any, res: any) {
        try {
            let [commentory]: any = await this.connection.write.query("select play , status from cricket_match where match_key = ?", [req.query.match_key]);
            if (commentory[0].status == "completed") {
                commentory = commentory[0]?.play
                commentory.related_balls = Object.values(commentory?.related_balls)
            }

            return this.sendSuccess(res, { data: commentory })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }
    async getPlayerbyId(req, res) {
        try {
            let [player]: any = await this.connection.write.query("select players from cricket_match where match_key = ?",
                [req.query.match_key]);
            player = Object.values(player[0]?.players ?? {})
            player = player.find(e => e.player?.key === req.query.player_key)
            return this.sendSuccess(res, { data: player })
        } catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }

    }


    async findPlayerImage(req: any, res: any) {
        try {
            let sql = "select  image from players where player_key = ?"
            let [image]: any = await this.connection.write.query(sql, [req.query.player_key]);
            return this.sendSuccess(res, { data: image })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }


}