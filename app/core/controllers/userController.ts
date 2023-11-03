import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../jwt/jsonwebtoken"
import { SQL_ALL_USER, SQL_CHECK_USER, SQL_DELETE_USER, SQL_INSERT_USER, SQL_UPDATE_USER } from "../query/query";
import { otpController } from "./otp.controller";
import { uploads3 } from "../aws/uploads3";
export class user extends ResponseInterceptor {
    public connection: connection
    encryptionDecryption : EncryptionDecryption;
    tokenController : tokenController;
    otpController : otpController
    public uploads3 : uploads3
    constructor() {
        super()
        this.connection = new connection()
        this.encryptionDecryption = new EncryptionDecryption()
        this.tokenController = new tokenController()
        this.otpController = new otpController()
        this.uploads3 = new uploads3()
    }
    async register(req: any, res: any) {
        try {
            const { phone, password , otp ,otp_id } = req.body

            let check : any = await this.otpController.verify(otp_id) ;
            if(check.status != "USED"){
                return this.sendBadRequest(res,  "phone Number is Not verify" , this.BAD_REQUEST)
            } 
            console.log(check.phone  , phone , typeof check.phone ,typeof phone)
            if(check.phone != phone){
                return this.sendBadRequest(res,  "invalid phone Number" , this.BAD_REQUEST)
            }
            const [user]: any = await this.connection.write.query(SQL_CHECK_USER, [phone]);
            if (user.length > 0) {
                return this.sendBadRequest(res,  "User Already Exist" , this.BAD_REQUEST)
            }
            const hash = await this.encryptionDecryption.Encryption(password)
            await this.connection.write.query(SQL_INSERT_USER, [phone, hash]);
            return this.sendSuccess(res, { message: "User Insert Successfully" })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }

    async login(req: any, res: any) {
        try {
            const { phone, password } = req.body
            const [user]: any = await this.connection.write.query(SQL_CHECK_USER, [phone]);
            if (user.length === 0) {
                return this.sendBadRequest(res, "You are not register" , this.BAD_REQUEST)
            }
            const comparePassword = await this.encryptionDecryption.Decryption(password , user[0].password)
            if (!comparePassword) {
                return this.sendBadRequest(res,  "Wrong Password", this.BAD_REQUEST,)
            }
            const token = await this.tokenController.generateToken(user[0] , res )
            return this.sendSuccess(res, { message: "Login Successfully", token: token , userData : user[0] })
        }
        catch (err) {
            console.error(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
   async findAllUsers(req : any, res : any){
    try{
       
        const [user]: any = await this.connection.write.query(SQL_ALL_USER);
        return this.sendSuccess(res, { message: "All User List ", data : user })
    }
    catch(err){
        console.error(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
// update Profile Data
   async updateUserByAuth(req : any, res : any){
    try{
        const {phone} = res.locals.auth.user
        const {fname,mname,lname,Phone,email} = req.body
        const [user]: any = await this.connection.write.query(SQL_UPDATE_USER, [fname,mname,lname,email, phone]);
        return this.sendSuccess(res, { message: "User updated Successfully" ,user : user })

    }
    catch(err){
        console.error(err)
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
        console.error(err)
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
        console.error(err)
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
   //    find user By Id  from users
   async findById(req : any, res : any){
    try{
        const {phone} = res.locals.auth.user
        const [user]: any = await this.connection.write.query("select * from user_profile where phone = ?", [phone]);
        return this.sendSuccess(res, { data : user[0] })
    }
    catch(err){
        console.error(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
  




   }

   // --------------------- admin-----------------------
   async updateAllUsers(req : any, res : any){
    try{
        const {phone} = req.query.phoner
        const {fname,mname,lname,Phone,email} = req.body
        const [user]: any = await this.connection.write.query(SQL_UPDATE_USER, [fname,mname,lname,email, phone]);
        return this.sendSuccess(res, { message: "User updated Successfully" ,user : user })
    }
    catch(err){
        console.error(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }


   async findByIds(req : any, res : any){
    try{
        const {phone} = req.query
        console.log(phone)
        const [user]: any = await this.connection.write.query("select * from user_profile where phone = ?", [phone]);
        return this.sendSuccess(res, { data : user[0] })
    }
    catch(err){
        console.error(err)
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

}