const cron = require('node-cron');

import { token } from './genrateToken';

export class cronJob {

  token: token;
  constructor() {
    this.token = new token()
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
}



// cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute');
// });








