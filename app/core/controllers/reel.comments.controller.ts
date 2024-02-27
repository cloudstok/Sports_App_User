import { ResponseInterceptor } from '../utilities/response-interceptor';
import { connection } from '../../config/dbConf';
import { uploads3 } from '../aws/uploads3';
import {user} from './userController'
const addComments = "INSERT INTO reels_comments set ?";
const updateComments = "UPDATE reels_comments SET ? WHERE comment_id = ?"
const getAllComments = "SELECT * FROM reels_comments where is_deleted = 1 order by comment_id DESC"
const getCommentByReelId = "SELECT * FROM reels_comments WHERE reel_id = ? and is_deleted = 1 order by comment_id DESC"
const getCommentById = "SELECT * FROM reels_comments WHERE comment_id = ?"
const DeleteComments = ""

export class reelComments extends ResponseInterceptor {
    connection: connection
    upload: uploads3
    user :user
    constructor() {
        super();
        this.connection = new connection()
        this.upload = new uploads3();
        this.user = new user()
    }

   async addComment(data :{}){
    try{
   const insertComment =  await this.connection.write.query(addComments ,[data])
   return true
    }catch(err){
       return false
    }
   } 

   async updateComment(data :{data :{} ,comment_id :number}){
    try{
   const insertComment =  await this.connection.write.query(updateComments ,[data.data , data.comment_id])
   return true
    }catch(err){
       return false
    }
   } 

   async getComments(){
    try{
   const [insertComment] =  await this.connection.write.query(getAllComments)
   return insertComment
    }catch(err){
       return false
    }
   } 

   async getCommentByReelId(reel_id : number){
    try{
     
   const [Comments] :any =  await this.connection.write.query(getCommentByReelId ,[reel_id])
   for(let x of Comments){
      let  [user] : any = await this.user.findUserByPhone(x.phone)
      x.UserName = user.name
      x.userImage = user.image
   }
   return Comments.length > 0 ? Comments : "no data found"
    }catch(err){
       return false
    }
   } 

   async getCommentByCommentId(comment_id :number){
    try{
   const insertComment =  await this.connection.write.query(getCommentById ,[comment_id])
   return insertComment[0]
    }catch(err){
       return false
    }
   } 

   async DeleteComment(id :number){
    try{
   const insertComment =  await this.connection.write.query(DeleteComments ,[id])
   return true
    }catch(err){
       return false
    }
   } 

   async addCommentToTable(req: any, res: any){
    try{
       await this.addComment(req.query);
       return this.sendSuccess(res, { status: "success", msg: "Comment added successfully"});
    }catch(err){
        console.error(`[ERR] error while inserting comments to table is:::`, err);
        return this.sendBadRequest(res, err)
    }
   }

   async updateCommentToTable(req: any, res: any){
    try{ 
      const {comment_id, reel_id,phone,comment} = req.query
        let data = {
            data: {reel_id,phone,comment},
            comment_id: comment_id
        }
       await this.updateComment(data);
       return this.sendSuccess(res, { status: "success", msg: "Comment updated successfully"});
    }catch(err){
        console.error(`[ERR] error while updating comments to table is:::`, err);
        return this.sendBadRequest(res, err)
    }
   }

   async getAllCommentsByReelIdTable(req: any, res: any){
    try{
       const comments = await this.getCommentByReelId(req.query.reel_id);
       return  this.sendSuccess(res, { status: "success", msg: "Comment fetched successfully", comments});
    }catch(err){
        console.error(`[ERR] error while getting comments to table is:::`, err);
        return this.sendBadRequest(res, err)
    }
   }

   async getAllCommentsByCommentIdTable(req: any, res: any){
    try{
       const comments = await this.getCommentByCommentId(req.query.comment_id);
       return this.sendSuccess(res, { status: "success", msg: "Comment fetched successfully", comments});
    }catch(err){
        console.error(`[ERR] error while getting comments to table is:::`, err);
        return this.sendBadRequest(res, err)
    }
   }
}