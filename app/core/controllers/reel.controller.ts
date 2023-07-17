import { ResponseInterceptor } from '../../core/utilities/response-interceptor';
import {connection} from '../../config/dbConf';
import { SQL_SHOW_NEWS, SQL_SHOW_REELS } from '../query/query';


export class reel extends ResponseInterceptor{
    connection : connection
    constructor(){
        super();
        this.connection = new connection()
    }

async showReel (req : any , res : any) {
    try{
        let {PageLimit , PageOffset} = req.query
        const [showsReel] = await this.connection.read.query(SQL_SHOW_REELS, [+PageLimit, +PageOffset] );
        return this.sendSuccess(res, {data: showsReel})
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}

async getNews(req: any ,res: any ) {
    try{
        let {PageLimit , PageOffset} = req.query
        const [news] = await this.connection.write.query(SQL_SHOW_NEWS ,  [+PageLimit , +PageOffset]);
        return this.sendSuccess(res, {data: news})
    }catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}
}