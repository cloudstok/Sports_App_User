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

    async getPlayerByRoles(players: any, batting_order: any, bowling_order: any) {
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
            if (bowling_order && x.player.key && bowling_order?.includes(x.player.key)) {
                let index = bowling_order.findIndex((e: any) => e === x.player.key)
                bowler[index] = x

            } if (batting_order && x.player.key && batting_order?.includes(x.player.key)) {
                let battingIndex = batting_order.findIndex((e: any) => e === x.player.key);
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

    async socrcard(player: any) {
        let data: any = {}
        let teamA = player[0]?.team?.a
        let teamB = player[0]?.team?.b
        let players = Object.values(player[0]?.players)
        //    console.log(team , "team")
        let squadA = player[0].squad.a.playing_xi || player[0].squad.a.player_keys
        let squadB = player[0].squad.b.playing_xi || player[0].squad.b.player_keys
        // let teamAplayer = players?.filter((e: any) => e?.player?.nationality?.code == teamA.country_code)
        // let teamBplayer = players?.filter((e: any) => e?.player?.nationality?.code == teamB.country_code)

        let teamAplayer = players?.filter((e: any) => (squadA.includes(e.player?.key)))
        let teamBplayer = players?.filter((e: any) => (squadB.includes(e.player?.key)))


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


    //test match
    async testmatchsocrcard(player: any) {
        let data: any = {}
        let players = Object.values(player[0]?.players)
        //    console.log(team , "team")
        let squadA = player[0]?.squad?.a?.playing_xi || player[0]?.squad?.a?.player_keys
        let squadB = player[0]?.squad?.b?.playing_xi || player[0]?.squad?.b?.player_keys
        let teamAplayer = players?.filter((e: any) => (squadA?.includes(e?.player?.key)))
        let teamBplayer = players?.filter((e: any) => (squadB?.includes(e?.player?.key)))


        player[0].team.a.score = player[0]?.play?.innings['a_1']
        player[0].team.b.score = player[0]?.play?.innings['b_1']
        player[0].team.a.score_a2 = player[0]?.play?.innings['a_2']
        player[0].team.b.score_b2 = player[0]?.play?.innings['b_2']
        //  console.log( player[0].team.b.score)
        let o = {
            'batting_order_A': player[0]?.play?.innings['a_1']?.batting_order,
            'batting_order_B': player[0]?.play?.innings['b_1']?.batting_order,
            'bowling_order_A': player[0]?.play?.innings['a_1']?.bowling_order,
            'bowling_order_B': player[0]?.play?.innings['b_1']?.bowling_order,

            'batting_order_C': player[0]?.play?.innings['a_2']?.batting_order,
            'batting_order_D': player[0]?.play?.innings['b_2']?.batting_order,
            'bowling_order_C': player[0]?.play?.innings['a_2']?.bowling_order,
            'bowling_order_D': player[0]?.play?.innings['b_2']?.bowling_order,
        }
        data.nationality = Object.values(player[0].team);
        let partnershipsa_1: any = player[0]?.play?.innings['a_1']['partnerships']
        let partnershipsb_1: any = player[0]?.play?.innings['b_1']['partnerships']
        let partnershipsa_2
        let partnershipsb_2
        if (player[0]?.play?.innings['a_2']) {
            partnershipsa_2 = player[0]?.play?.innings['a_2']['partnerships']
            partnershipsb_2 = player[0]?.play?.innings['b_2']['partnerships']
            data.teamC = await this.getPlayerByRoles(teamAplayer, o?.batting_order_C, o?.bowling_order_C)
            data.teamD = await this.getPlayerByRoles(teamBplayer, o?.batting_order_D, o?.bowling_order_D)
            data.teamD.partnerships = partnershipsb_2
            data.teamC.partnerships = partnershipsa_2
            data.teamC.extraRun = data?.nationality[0]?.score?.extra_runs
            data.teamD.extraRun = data?.nationality[1]?.score?.extra_runs
        }

        data.teamA = await this.getPlayerByRoles(teamAplayer, o?.batting_order_A, o?.bowling_order_A)
        data.teamB = await this.getPlayerByRoles(teamBplayer, o?.batting_order_B, o?.bowling_order_B)
        data.teamB.partnerships = partnershipsb_1
        data.teamA.partnerships = partnershipsa_1

        // data.teamD.partnerships = partnershipsb_2
        // data.teamC.partnerships = partnershipsa_2
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
    async getPlayerbyId(req: any, res: any) {
        try {
            let [player]: any = await this.connection.write.query("select players from cricket_match where match_key = ?",
                [req.query.match_key]);
            player = Object.values(player[0]?.players ?? {})
            player = player.find((e: any) => e.player?.key === req.query.player_key)
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