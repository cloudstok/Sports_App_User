const cron = require('node-cron');
import { connection } from '../../config/dbConf';

import { token } from './genrateToken';
import { subscribe } from './subscribe'
import { API_TO_INTEGRATE } from './API_TO_INTEGRATE/api_to_integrate';
import { players } from './playerController';
export class cronJob {

  token: token;
  subscribes: subscribe;
  connection: connection;
  thirdPartyAPI: API_TO_INTEGRATE;
  players: players;
  constructor() {
    this.token = new token()
    this.subscribes = new subscribe()
    this.connection = new connection();
    this.thirdPartyAPI = new API_TO_INTEGRATE();
    this.players = new players();
  }

  async genrateToken() {
    try {

      const cronExpression = '59 23 * * *';
      // Schedule the cron job
      cron.schedule(cronExpression, async() => {
        console.log(`[INFO] Auto token update cron job running daily at 11:59 PM`);
         await this.token.genrateToken()
      },
      {
        scheduled: true,
        timezone: 'Asia/kolkata',
      });


    } catch (err) {
      console.error(`Error while running cron job is::`, err)
    }
  }

  async autoSubscribeMatch() {
    try {
      cron.schedule('*/15 * * * *', async (req, res) => {
        let currentTime = Math.round((new Date().getTime()) / 1000);
        let graceTime = Math.round((new Date().getTime() + (30 * 60000)) / 1000);
        let [getMatchesForSubscribtion]: any = await this.connection.write.query(`SELECT match_key, name, status, start_at, format, estimated_end_date, completed_date_approximate, tou_key, tou_name from cricket_match where status = 'not_started' and (start_at < ${graceTime} and start_at > ${currentTime})`);
        console.log("Auto subscribtion of matches cron running every 15 minutes, getting details:::", graceTime, currentTime, JSON.stringify(getMatchesForSubscribtion));
        for (let x of getMatchesForSubscribtion) {
          req.query.tou_key = x.tou_key;
          req.params.tou_key = x.tou_key;
          await this.thirdPartyAPI.update_tournaments(req, res, true);
          await this.thirdPartyAPI.tournaments_point_table(req, res, true);
          await this.players.addStats(req, res, true);
          await this.thirdPartyAPI.add_matches(req, res, true);
          await this.thirdPartyAPI.update_matches(req, res, true);
          let subscribtion = await this.subscribes.subscribe(x)
          if (subscribtion?.['status']) {
            console.log(`Match subscribed successfully for match key::`, x.match_key, "at Time", new Date(x.start_at * 1000), "subscribtion response", subscribtion)
          } else {
            console.error(`[ERR] while subscribing for match with match key is:`, x.match_key, "at time", new Date(x.start_at * 1000), "subscribtion response", subscribtion);
          }
        }
      })
    } catch (err) {
      console.error(`[ERR] while starting auto subscribtion of match cron is::`, err)
    }
  }

}








