import { appConfig } from "../../config/appConf";

export class apiValidation{
   responseBody : {}= {version : appConfig.ver,timeSamp: new Date(), status:  'fail',errCode: ' 422 Unprocessable Entity'}
validateBodyData = (schema :any) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.body);
        console.log("hello body")
        if (error) {
          return res.status(422).send(Object.assign(this.responseBody , {errMsg: error.details[0].message}));
        } else {
          next();
        }
      };

      validateQueryData = (schema : any) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.body);
        console.log("hello Query")
        if (error) {
          return res.status(422).send(Object.assign(this.responseBody , {errMsg: error.details[0].message}));
        } else {
          next();
        }
      };

      validateParamsData = (schema : any) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.body);
        console.log("hello Params")
        if (error) {
          return res.status(422).send(Object.assign(this.responseBody , {errMsg: error.details[0].message}));
        } else {
          next();
        }
      };
      
      
}