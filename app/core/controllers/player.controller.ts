import { SQL_GET_PLAYER } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { waitForDebugger } from "inspector";
// import { set } from "mongoose";

var fs = require('fs');

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
            if (player[0]?.status == "not_started") {
                return this.sendSuccess(res, { message: "this match is not completed" })
            }
            if (player[0].format = "test") {
                const data = await this.testmatchsocrcard(player)
                return this.sendSuccess(res, { data: data })
            } else {
                const data = await this.socrcard(player)
                return this.sendSuccess(res, { data: data })
            }

        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
        }
    }

    // emit socrcard

    async socrcard(player: any) {
        let data: any = {}
        let playerName = player[0].players
        let players =  player[0]?.players ? Object.values(player[0]?.players) : []

        let squadA = player[0].squad.a.playing_xi || player[0].squad.a.player_keys
        let squadB = player[0].squad.b.playing_xi || player[0].squad.b.player_keys
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
        // data.nationality = Object.values(player[0].team);
        data.nationality = [player[0].team.a, player[0].team.b];
        let partnerships1: any = player[0]?.play?.innings['a_1']['partnerships']
        let partnerships2: any = player[0]?.play?.innings['b_1']['partnerships']
        let addplayer = async (partnerships, playerName) => {
            if (Array.isArray(partnerships) && partnerships.length > 0) {
                for (let x of partnerships) {
                    if (x.player_a_key) {
                        x.player_a_name = playerName[x.player_a_key].player.name
                        // console.log( playerName[x.player_a_key].player.name , x.player_a_key , "not test")
                    }
                    if (x.player_b_key) {
                        x.player_b_name = playerName[x.player_b_key].player.name
                        // console.log( playerName[x.player_a_key].player.name , x.player_a_key , "not test")
                    }
                    return true
                }
            }
        }

        await addplayer(partnerships1, playerName)
        await addplayer(partnerships2, playerName)

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
        let playerName = player[0].players
        let players =player[0]?.players ? Object.values(player[0]?.players) : []
        //    console.log(team , "team")
        let squadA = player[0]?.squad?.a?.playing_xi || player[0]?.squad?.a?.player_keys
        let squadB = player[0]?.squad?.b?.playing_xi || player[0]?.squad?.b?.player_keys
        let teamAplayer = players?.filter((e: any) => (squadA?.includes(e?.player?.key)))
        let teamBplayer = players?.filter((e: any) => (squadB?.includes(e?.player?.key)))


        player[0].team.a.score = player[0]?.play?.innings['a_1']
        player[0].team.b.score = player[0]?.play?.innings['b_1']
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
        data.nationality = [player[0].team.a, player[0].team.b];
        let partnershipsa_1: any = player[0]?.play?.innings['a_1']['partnerships']
        let partnershipsb_1: any = player[0]?.play?.innings['b_1']['partnerships']
        let partnershipsa_2
        let partnershipsb_2

        let addplayer = async (partnerships, playerName) => {
            // console.log(partnerships.length , "test")
            if (Array.isArray(partnerships) && partnerships.length > 0) {
                for (let x of partnerships) {
                    // console.log( "test1")
                    if (x.player_a_key) {
                        x.player_a_name = playerName[x.player_a_key].player.name
                    }
                    if (x.player_b_key) {
                        x.player_b_name = playerName[x.player_b_key].player.name
                    }
                    // return true
                }
            }
        }

        await addplayer(partnershipsb_1, playerName)
        await addplayer(partnershipsa_1, playerName)

        if (player[0]?.play?.innings['a_2']) {
            data.nationality[2] = {
                "key": player[0].team.a.key,
                "code": player[0].team.a.code,
                "name": player[0].team.a.name,
                "country_code": player[0].team.a.country_code,
                "score": player[0]?.play?.innings['a_2']
            }

            data.nationality[3] = {
                "key": player[0].team.b.key,
                "code": player[0].team.b.code,
                "name": player[0].team.b.name,
                "country_code": player[0].team.b.country_code,
                "score": player[0]?.play?.innings['b_2']
            }
            partnershipsa_2 = player[0]?.play?.innings['a_2']['partnerships']
            partnershipsb_2 = player[0]?.play?.innings['b_2']['partnerships']
 
            await addplayer(partnershipsb_2, playerName)
            await addplayer(partnershipsa_2, playerName)

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
        data.teamA.extraRun = data?.nationality[0]?.score?.extra_runs
        data.teamB.extraRun = data?.nationality[1]?.score?.extra_runs
        delete data?.nationality[0]?.score?.extra_runs;
        delete data?.nationality[1]?.score?.extra_runs;
        return data
    }





    async getcommentory(req: any, res: any) {
        try {
            let [commentory]: any = await this.connection.write.query("select play , status from cricket_match where match_key = ?", [req.query.match_key]);

            if (commentory[0].status == "completed" || commentory[0].status == "started") {
                commentory = commentory[0]?.play
                commentory.related_balls = commentory?.related_balls ? Object.values(commentory?.related_balls) : []
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
            player = player[0]?.players ? Object.values(player[0]?.players ?? {}) : []
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

    async tournament(tou_key) {
        const [data]: any = await this.connection.write.query("SELECT countries, start_date , gender , formats, imgURl , last_scheduled_match_date FROM tournament where tou_key = ? ", [tou_key])
        return data[0]
    }

    async playerinfo(req, res) {
        try {
            let finalData = []
            const [data]: any = await this.connection.write.query("SELECT * FROM cricket_match")
            for (let x of data) {

                if (x.squad && x.squad.a.playing_xi) {
                    if ([...x.squad.a.playing_xi, ...x.squad.b.playing_xi].includes(req.query.player_key)) {
                        let check = finalData.find(e => e.tou_name === x.tou_name)
                        if (check) {
                            check.match.push({match_key : x.match_key, name: x.name, format: x.format, score: x.players[req.query.player_key]  , start_at : x.start_at})
                        } else {
                            finalData.push(
                                {
                                    
                                    tou_name: x.tou_name,
                                    tou_key: x.tou_key,
                                    match: [{ match_key : x.match_key, name: x.name, format: x.format, score: x.players[req.query.player_key],   start_at : x.start_at }]
                                   
                                }
                            )
                        }


                    }

                }
            }
            for (let x of finalData) {
                let totalRun = 0
                let totalstrike_rate = 0
                let c = await this.tournament(x.tou_key)
                Object.assign(x, c)
                for (let y of x.match) {
                    let run = y.score?.score?.['1']?.batting?.score?.runs;
                    let strike_rate = y.score?.score?.['1']?.batting?.score?.strike_rate;
                    if (run) {
                        totalRun += run
                        totalstrike_rate += strike_rate
                    }
                }
                x.totalstrike_rate = totalstrike_rate / x.match.length
                x.totalRun = totalRun
                x.totalRunAvg = totalRun / x.match.length
                x.totalMatch = x.match.length
            }
            return this.sendSuccess(res, { status: "success", msg: "Player stats", finalData })
        } catch (err) {
            console.error(`[ERR] while getting player info is::`, err);
            return this.sendInternalError(res, 'Something went wrong');
        }
    }



}