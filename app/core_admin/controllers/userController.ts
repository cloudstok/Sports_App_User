import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../../core/bcrypt/bcrypt";
import { tokenController } from "../../core/jwt/jsonwebtoken";
import { SQL_ALL_USER, SQL_CHECK_USER, SQL_DELETE_USER, SQL_INSERT_USER, SQL_UPDATE_USER } from "./query/query";
import { uploads3 } from "../../core/aws/uploads3";
export class user extends ResponseInterceptor {
    public connection: connection
    encryptionDecryption : EncryptionDecryption;
    tokenController : tokenController;
    public uploads3 : uploads3
    constructor() {
        super()
        this.connection = new connection()
        this.encryptionDecryption = new EncryptionDecryption()
        this.tokenController = new tokenController()
        this.uploads3 = new uploads3()
    }

   async findAllUsers(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(SQL_ALL_USER);
        return this.sendSuccess(res, { message: "All User List ", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
// update Profile Data
   async updateAllUser(req : any, res : any){
    try{
        const {phone} = res.locals.auth.user
        const {fname,mname,lname,Phone,email} = req.body
        const [user]: any = await this.connection.write.query(SQL_UPDATE_USER, [fname,mname,lname,email, phone]);
        return this.sendSuccess(res, { message: "User updated Successfully" ,user : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
// Update user Profile Image
   async profileImage(req : any, res : any){
    try{
        const {phone} = res.locals.auth.user
        const files = req.files
        const url:any =  await this.uploads3.uploadImage(files)
        // console.log(url.Location ,phone)
        await this.connection.write.query("update user_profile set image = ? where phone = ? limit 1" , [url.Location, phone]);
        return this.sendSuccess(res, { message: "User Image upload  Successfully" ,user : url.location })

    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
  // delete user from users tables
   async DeleteUser(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(SQL_DELETE_USER, [req.params.u_id]);
        return this.sendSuccess(res, { message: "User delete Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
   //    find user By Id  from users
   async findById(req : any, res : any){
    try{
        const {phone} = req.query
        console.log(phone)
        const [user]: any = await this.connection.write.query("select * from user_profile where phone = ?", [phone]);
        return this.sendSuccess(res, { data : user[0] })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
}