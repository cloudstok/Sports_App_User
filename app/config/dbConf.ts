import {createPool} from 'mysql2/promise';
import { appConfig } from './appConf';
  export class connection{
    public data :string = appConfig.uri
  constructor(){

  }
     read = createPool(this.data);
      
      // create the write connection to database
      write = createPool(this.data);
  }
// create the read connection to database