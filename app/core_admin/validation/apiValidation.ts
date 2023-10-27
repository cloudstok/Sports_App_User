import { appConfig } from "../../config/appConf";
export class apiValidation{

validate = (schema : any) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.body);
        if (error) {
          let responseBody = {version : appConfig.ver,timeSamp: new Date(), status:  'fail',errCode: ' 422 Unprocessable Entity',errMsg: error.details[0].message
        }
          return res.status(422).send(responseBody);
        } else {
          next();
        }
      };


      validateParams = (schema : any) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.params);
        if (error) {
          let responseBody = {version : appConfig.ver,timeSamp: new Date(), status:  'fail',errCode: ' 422 Unprocessable Entity',errMsg: error.details[0].message
        }
          return res.status(422).send(responseBody);
        } else {
          next();
        }
      };
}