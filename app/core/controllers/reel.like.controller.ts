import { ResponseInterceptor } from '../utilities/response-interceptor';
import { connection } from '../../config/dbConf';
import { uploads3 } from '../aws/uploads3';


const addLikes = "INSERT INTO reels_like set ?" 
const updateLikes = "UPDATE reels_like set ? where like_id = ?"
const getAllLikes = "SELECT * FROM reels_like"
const getLikeByReelId = "SELECT * FROM reels_like where reel_id = ? and status = 'like'"
const getLikeById = "SELECT * FROM reels_like where like_id = ?"
const DeleteLikes = "DELETE FROM reels_like WHERE like_id = ?"

export class reelLike extends ResponseInterceptor {
    connection: connection
    upload: uploads3
    constructor() {
        super();
        this.connection = new connection()
        this.upload = new uploads3();
    }

    async addLike(data :{}){
        try{
       const insertLike =  await this.connection.write.query(addLikes ,[data])
       return true
        }catch(err){
           return false
        }
       } 
    
       async updateLike(data :{data :{} ,like_id :number}){
        try{
       const insertLike =  await this.connection.write.query(updateLikes ,[data.data , data.like_id])
       return true
        }catch(err){
           return false
        }
       } 
    
       async getLikes(){
        try{
       const [insertLike] =  await this.connection.write.query(getAllLikes)
       return insertLike
        }catch(err){
           return false
        }
       } 
    
       async getLikeByReelId(reel_id : number){
        try{
       const insertLike =  await this.connection.write.query(getLikeByReelId ,[reel_id])
       return insertLike[0]
        }catch(err){
           return false
        }
       } 
    
       async getLikeByLikeId(like_id :number){
        try{
       const insertLike =  await this.connection.write.query(getLikeById ,[like_id])
       return insertLike[0]
        }catch(err){
           return false
        }
       } 
    
       async DeleteLike(id :number){
        try{
       const insertLike =  await this.connection.write.query(DeleteLikes ,[id])
       return true
        }catch(err){
           return false
        }
       } 
       async addLikeToTable(req: any, res: any){
        try{
           
           await this.addLike(req.body);
           return this.sendSuccess(res, { status: "success", msg: "Like added successfully"});
        }catch(err){
            console.error(`[ERR] error while inserting Likes to table is:::`, err);
            return this.sendBadRequest(res, err)
        }
       }
    
       async updateLikeToTable(req: any, res: any){
        try{
          
            let data = {
                data: req.body,
                like_id: req.query.like_id
            }
           await this.updateLike(data);
           return this.sendSuccess(res, { status: "success", msg: "Like updated successfully"});
        }catch(err){
            console.error(`[ERR] error while updating Likes to table is:::`, err);
            return this.sendBadRequest(res, err)
        }
       }
    
       async getAllLikesByReelIdTable(req: any, res: any){
        try{
           const Likes = await this.getLikeByReelId(req.query.reel_id);
           return this.sendSuccess(res, { status: "success", msg: "Like fetched successfully", Likes});
        }catch(err){
            console.error(`[ERR] error while getting Likes to table is:::`, err);
            return this.sendBadRequest(res, err)
        }
       }
    
       async getAllLikesByLikeIdTable(req: any, res: any){
        try{
           const Likes = await this.getLikeByLikeId(req.query.like_id);
           return this.sendSuccess(res, { status: "success", msg: "Like fetched successfully", Likes});
        }catch(err){
            console.error(`[ERR] error while getting Likes to table is:::`, err);
            return this.sendBadRequest(res, err)
        }
       }

      //  async likeOrDislike(req: any, res: any){
      //    try{ 
      //       let{like_id}  =  req.query
      //       if(like_id){
      //          let data = {
      //             data: req.body,
      //             like_id: like_id
      //         }
      //        await this.updateLike(data);
      //       }else{
      //          let [check]:any = await this.connection.write.query("")
      //          if(check.length > 0){
      //             await this.updateLike(data);
      //          }
      //          await this.addLike(req.body);
      //       }
           
      //       return this.sendSuccess(res, { status: "success", msg: "Like added successfully"});
      //    }catch(err){
      //        console.error(`[ERR] error while inserting Likes to table is:::`, err);
      //        return this.sendBadRequest(res, err)
      //    }
      //   }

}