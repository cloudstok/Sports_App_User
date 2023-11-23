const cron = require('node-cron');

import {auto} from './subscribe'

export class cronJob{
  auto : auto;
  constructor(){
    this.auto = new auto()
  }
    async cron(){
    try{
      cron.schedule('* * * * * *', ()=> {
        console.log('cron running every second')
        this.auto.subscribe()

      })
    }catch(err){
      console.error(`Error while running cron job is::`, err)
    }
  }
}



// cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute');
// });








