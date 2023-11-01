import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";
import { EncryptionDecryption } from "../bcrypt/bcrypt";
import { tokenController } from "../jwt/jsonwebtoken";
import { SQL_ALL_ADMIN, SQL_CHECK_ADMIN, SQL_DELETE_ADMIN, SQL_INSERT_ADMIN, SQL_UPDATE_ADMIN } from "../query/query";
export class Association extends ResponseInterceptor {
    public connection: connection
    encryptionDecryption : EncryptionDecryption;
    tokenController : tokenController;
    constructor() {
        super()
        this.connection = new connection()
        this.encryptionDecryption = new EncryptionDecryption()
        this.tokenController = new tokenController()
    }
    async associationList(req, res){
        try{
            let [associationList] = await this.connection.write.query("Select * from associations");
            return res.send(associationList);

        }catch(err){
            console.log(`Err while getting assocation data is::`, err)
            this.sendBadRequest(err)
        }
    }

}