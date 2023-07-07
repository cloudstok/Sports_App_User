import * as jwt from 'jsonwebtoken'
import { appConfig } from '../../config/appConf'
import { ResponseInterceptor } from "../utilities/response-interceptor";
export class tokenController extends ResponseInterceptor{
    constructor(){
      super();
    }
    async generateToken(storeData :{}, res : any){
      try{
        return await jwt.sign({ user: storeData }, appConfig.jwt.jwtSecretKey, { expiresIn: appConfig.jwt.jwtExpiry })
      }catch(err){
        let responseBody = {
          version : appConfig.ver,
          timeSamp: new Date(), 
          errMsg: err
      }
       res.send(responseBody)
      }
    }
    async verifyToken(req :any , res :any , next : any){
      try{
        const tokenHeader = req.headers.authorization;
        if(!tokenHeader)
        return res.status(401).json({"message":"Token not found"});
        const token = tokenHeader.split(" ")[1];
        const verifiedToken = jwt.verify(token, appConfig.jwt.jwtSecretKey);
        if(!verifiedToken)
          return res.status(401).json({ "message":"invalid token"})
        res.locals.auth = verifiedToken;
        // return(res.locals.auth)
        next()
      }catch(err){
        let responseBody = {
          version : appConfig.ver,
          timeSamp: new Date(), 
          errMsg: err
      }
       res.send(responseBody)
      }
    }
}