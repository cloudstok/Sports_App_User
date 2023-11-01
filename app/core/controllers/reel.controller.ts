import { ResponseInterceptor } from '../../core/utilities/response-interceptor';
import {connection} from '../../config/dbConf';
import { uploads3 } from '../../core/aws/uploads3';
// import { SQL_ADD_REELS, SQL_SHOW_REELS } from '../query/query';
import { SQL_ADD_REELS, SQL_SHOW_NEWS, SQL_SHOW_REELS, SQL_UPDATE_REALS } from '../query/query';


export class reel extends ResponseInterceptor{
    connection : connection
    upload: uploads3
    constructor(){
        super();
        this.connection = new connection()
        this.upload = new uploads3();
    }

    async updateMetaData(data :{}, id : number){
        try{
            await this.connection.write.query(SQL_UPDATE_REALS, [data, id]);
            return true
        }catch(err){
            console.log(err)
        }
    }
    async findMetaData(id :number){
        try{
            const [metaData] = await this.connection.write.query(SQL_ADD_REELS, [id]);
            return metaData[0]
        }catch(err){
            console.log(err)
        }
    }    

async showReel (req : any , res : any) {
    try{
        let {PageLimit , PageOffset} = req.query
        let userId =  res.locals.auth.user?.user_id
        const [showsReel] : any= await this.connection.write.query(SQL_SHOW_REELS, [+PageLimit, +PageOffset] );
       
        for(let x of showsReel){
            x.likeCount = 0
            x.dislikeCount = 0
            x.commentCount = 0
            x.currentStatus = {}
            if(x.meta_data !== null && Array.isArray(x.meta_data)){
                for(let y of x.meta_data){
                if(y.status && y.status === "like"){
                    x.like +=1;
                }
                if(y.status && y.status === "dislike"){
                    x.like +=1;
                }
                if(y.comments && y.comments.length > 0 ){
                    x.commentCount += y.comments.length
                }
                if(y.userId == userId){
                    x.currentStatus = y
                }
                }
            }
            
        }
        return this.sendSuccess(res, {data: showsReel})
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}




async addUpdateReelStatus(req:any, res:any){
    try{
        const { reel_id} = req.params;
        const { meta_data} = req.body;
        let userId =  res.locals.auth.user?.user_id
        meta_data.userId = userId 
        let data = await this.findMetaData(reel_id);
        if(data.meta_data === null){
            data.meta_data = [meta_data]
        }else{
          let check=   data.meta_data.findIndex(e=>e.userId === userId)
          if(check !== -1){
            data.meta_data[check] = meta_data
          }else{
            data.meta_data.push(meta_data)
          }
        }
        await this.updateMetaData({"meta_data": JSON.stringify(data.meta_data)}, reel_id);
        return this.sendSuccess(res, { message: `${meta_data.status} updated successfully`, data: meta_data})
    }
    catch(err){
       this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
}


// -----------admin----------------------
async addReel(req: any, res: any) {
    try {
        let url = '';
        if (req.files && req.files.length > 0) {
            let imageUrl = await this.upload.uploadImage(req.files)
            url = imageUrl.Location
        }
        const [addingReel]: any = await this.connection.write.query(SQL_ADD_REELS, [url])
        return this.sendSuccess(res, { msg: "Reels added Successfully" })

    }
    catch (err) {
        this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
}

async showReels(req: any, res: any) {
    try {
        const {PageLimit , PageOffset} = req.query
        const [showsReel] = await this.connection.read.query(SQL_SHOW_REELS , [+PageLimit , +PageOffset]);
        return this.sendSuccess(res, { data: showsReel })
    }
    catch (err) {
        this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
}


//
async deleteReel(req : any , res : any){
    try {
        const [showsReel] = await this.connection.read.query("delete from reels where reel_id = ?" , [req.query.reel_id]);
        return this.sendSuccess(res, { data: showsReel })
    }
    catch (err) {
        this.sendBadRequest(res, `${err}`, this.BAD_REQUEST)
    }
}

}