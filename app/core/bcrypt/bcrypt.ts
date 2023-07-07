import * as bcrypt from "bcrypt";

export class EncryptionDecryption{
    SALT : number = 12
    constructor(){

    }
    async Encryption(user_password :string){
        return await bcrypt.hash(user_password, this.SALT)
    }
    async Decryption (Password :string , hashPassword : string){
        return await bcrypt.compare(Password, hashPassword)
    }
}