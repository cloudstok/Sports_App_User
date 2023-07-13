import { ResponseInterceptor } from '../../core/utilities/response-interceptor';
import {connection} from '../../config/dbConf';


export class reel extends ResponseInterceptor{
    connection : connection
    SQL_SHOW_REELS : string = `select * from reels where is_deleted = 0`;
    SQL_SHOW_NEWS: string = `SELECT * from news where is_deleted = 0`;
    constructor(){
        super();
        this.connection = new connection()
    }

async showReel (req : any , res : any) {
    try{
        const [showsReel] = await this.connection.read.query(this.SQL_SHOW_REELS);
        return this.sendSuccess(res, {data: showsReel})
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}

async getNews(req: any ,res: any ) {
    try{
        const [news] = await this.connection.write.query(this.SQL_SHOW_NEWS);
        return this.sendSuccess(res, {data: news})
    }catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}
}