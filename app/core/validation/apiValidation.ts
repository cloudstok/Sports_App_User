import { appConfig } from "../../config/appConf";
export class apiValidation{
validate = (schema) => (req :any ,res :any , next : any) => {
        const {error} = schema.validate(req.body);
        if (error) {
          let responseBody = {version : appConfig.ver,timeSamp: new Date(), status:  'fail',errCode: ' 422 Unprocessable Entity',errMsg: error.details[0].message
        }
          return res.status(422).send(responseBody);
        } else {
          next();
        }
      };
}