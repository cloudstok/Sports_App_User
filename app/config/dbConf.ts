import {createPool} from 'mysql2/promise';
import { appConfig } from './appConf';
<<<<<<< HEAD
=======

>>>>>>> b4a3655ed432852af81bd3281121e3917c172340
  export class connection{
    public data :string = appConfig.uri
    
  constructor(){

  }
     read = createPool(this.data);
      
      // create the write connection to database
      write = createPool(this.data);
  }
// create the read connection to database