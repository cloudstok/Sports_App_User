const cron = require('node-cron');

import { token } from './genrateToken';
import { subscribe } from './subscribe'
export class cronJob {

  token: token;
  subscribes: subscribe;
  constructor() {
    this.token = new token()
    this.subscribes = new subscribe()
  }
  async genrateToken() {
    try {
      cron.schedule('49 13 * * *', () => {
        // console.log('cron running every second')
        // this.token.genrateToken()

      })
    } catch (err) {
      console.error(`Error while running cron job is::`, err)
    }
  }

  async subscribe() {
    cron.schedule('* * * * *', () => {
      console.log("subscribe")
      this.subscribes.subscribeMatchCron()
    })
  }

}








