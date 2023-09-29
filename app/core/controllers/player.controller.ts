import { SQL_GET_PLAYER } from "../query/query";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
// import { set } from "mongoose";

export class playerController extends ResponseInterceptor{
    connection : connection
    constructor(){
    super()
    this.connection = new connection();
    }

    async getPlayerByRoles(players, batting_order, bowling_order){
        let finalData: any = {}
    let batsman = [];
    let bowler = [];
    let allRounder = [];
    for(let x of players){
        if(x.player.roles[0] === 'all_rounder'){
            allRounder.push(x)
        }
        console.log(bowling_order.includes(x.player.key),x.player.key,x.player.roles[0])
        if(bowling_order.includes(x.player.key)){
            let index = bowling_order.findIndex(e=> e === x.player.key)
            bowler[index] = x
        }if(batting_order.includes(x.player.key)){
            let battingIndex = batting_order.findIndex(e=> e === x.player.key);
            batsman[battingIndex] = x
        }
        
    }
       finalData.batsman = batsman; 
       finalData.bowler = bowler; 
       finalData.allRounder = allRounder;
       return finalData
    }
    
    async getsocrecard(req:any, res:any){
        try{
            let data  : any = {}
            let [player]  : any= await this.connection.write.query(SQL_GET_PLAYER , [req.query.match_key]);
            let play = Object.values( player[0].play.innings)
            let partnerships1 : any = play[0]['partnerships']
            let partnerships2 : any = play[1]['partnerships']
            let order = {
                p0bt: play[1]['batting_order'],
                p0bo: play[1]['bowling_order'],
                p1b1: play[0]['batting_order'],
                p1bo: play[0]['bowling_order']
            }
            delete play[0]['partnerships']
            delete play[1]['partnerships']
            player = Object.values(player[0].players);
            let nationality = [...new Set(player.map(e=>e.player.nationality.name))]
            data.nationality = [{name :nationality[0] , score : play[1] } , 
            {name :nationality[1] , score : play[0]}]
            let a = [...new Set(player.filter(e=>e.player.nationality.name === nationality[1] ))] ;
            let b = [...new Set(player.filter(e=>e.player.nationality.name === nationality[0] ))]
            data.team1 = await this.getPlayerByRoles(b, order.p0bt, order.p0bo)
            data.team2 = await this.getPlayerByRoles(a, order.p1b1, order.p1bo) 
            data.team1.partnerships2 = partnerships2
          data.team2.partnerships1 = partnerships1 
          return this.sendSuccess(res, {data: data })
        }   
        catch(err){
            console.log(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
    async getcommentory(req:any, res:any){
        try{
          let [commentory] : any = await this.connection.write.query("select play from cricket_match where match_key = ?" ,[req.query.match_key]);
       
          commentory = commentory[0].play
          commentory.related_balls = Object.values(commentory.related_balls)
          
          return this.sendSuccess(res, {data: commentory})
        }
        catch(err){
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
    async getPlayerbyId(req ,res){
        try{
            let [player] : any = await this.connection.write.query("select players from cricket_match where match_key = ?" , 
                 [req.query.match_key]);
                 player = Object.values(player[0].players)
                 player = player.find(e=>e.player.key === req.query.player_key)
              return this.sendSuccess(res, {data: player})
        }catch(err){
            console.error(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }

    }
}