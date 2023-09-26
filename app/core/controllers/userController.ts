import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../../core/utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../../core/jwt/jsonwebtoken";
import { SQL_ALL_USER, SQL_CHECK_USER, SQL_DELETE_USER, SQL_INSERT_USER, SQL_UPDATE_USER } from "../query/query";
import { otpController } from "./otp.controller";
export class user extends ResponseInterceptor {
    public connection: connection
    encryptionDecryption : EncryptionDecryption;
    tokenController : tokenController;
    otpController : otpController
    constructor() {
        super()
        this.connection = new connection()
        this.encryptionDecryption = new EncryptionDecryption()
        this.tokenController = new tokenController()
        this.otpController = new otpController()
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
            return this.sendSuccess(res, { message: "Login Successfully", token: token })
        }
        catch (err) {
            this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
        }
    }
   async findAllUsers(req : any, res : any){
    try{
        const [user]: any = await this.connection.write.query(SQL_ALL_USER);
        return this.sendSuccess(res, { message: "User Insert Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

   async updateAllUser(req : any, res : any){
    try{
        const { phone, password } = req.body
        const hash = await this.encryptionDecryption.Encryption(password)
        const [user]: any = await this.connection.write.query(SQL_UPDATE_USER, [ hash , phone]);
        return this.sendSuccess(res, { message: "Password updated Successfully", data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }

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
        const [user]: any = await this.connection.write.query(SQL_CHECK_USER, [req.params.u_id]);
        return this.sendSuccess(res, { data : user })
    }
    catch(err){
        this.sendBadRequest(res, `${err}` , this.BAD_REQUEST)
    }
   }
}