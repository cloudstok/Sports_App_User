import { appConfig } from "../../config/appConf";

export class apiValidation {
  responseBody: {} = { version: appConfig.ver, timeSamp: new Date(), status: false, errCode: 422 }
  validateBodyData = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(Object.assign(this.responseBody, { errMsg: error.details[0].message }));
    } else {
      next();
    }
  };

  validateQueryData = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(422).send(Object.assign(this.responseBody, { errMsg: error.details[0].message }));
    } else {
      next();
    }
  };

  validateParamsData = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(422).send(Object.assign(this.responseBody, { errMsg: error.details[0].message }));
    } else {
      next();
    }
  };
}