import { appConfig } from "../../config/appConf";

export class ResponseInterceptor {
    constructor() {
      }

    RESPONSE_SUCCESS = 200;
    BAD_REQUEST = 400;
    DB_OPERATION_FAILURE = 401;
    RECORD_NOT_FOUND = 404;
    SESSION_EXPIRED = 403;
    CONFLICT = 409;
    PRECONDITION_FAILED = 412;
    METHOD_NOT_ALLOWED = 405;
    UNSUPPORTED_MEDIA = 415;
    BAD_GATEWAY = 502;
    INTERNAL_ERROR = 500;
    NOT_IMPLEMENTED = 501;
    SERVICE_UNAVAILABLE = 503;
    BAD_MESSAGE = 'Bad Request';
    UNAUTHORIZED_ACCESS = 401;


    sendSuccess(res : any, data? : {}|string, message?: string) {
        let response = {
            ver : appConfig.ver,
            timeStamp: new Date(),
            status: 'success',
            // data: data

        };
        response = Object.assign({}, response, data);
        if (message) response["message"] = message;
        return this.sendResponse(res, this.RESPONSE_SUCCESS, response);

    }
    sendError(res :any, statusCode : number, errCode : {}| string | number, errMsg :{}|string) {
        let response = {
            version : appConfig.ver,
            timeStamp: new Date(),
            status: 'fail',
            errCode: errCode,
            errMsg: errMsg,
        }
        return this.sendResponse(res, statusCode, response);
    }
    sendBadRequest(res : any, message?: string , status? : number) {
        let responseBody = {
            version : appConfig.ver,
            timeSamp: new Date(), 
            status:  false,
            errCode: this.BAD_MESSAGE,
            errMsg: message ? message : 'Bad Request',
        }
        return this.sendResponse(res, this.BAD_REQUEST, responseBody);
    }
    sendInternalError(res:any, message?: string) {
        let responseBody = {
            version : appConfig.ver,
            timeSamp: new Date(),
            status: "fail",
            errCode: this.INTERNAL_ERROR, "errMsg": message ? message : 'Internal Server Error'
        }
        return this.sendResponse(res, this.BAD_REQUEST, responseBody);
    }
    sendResponse(res :any, status : number, response_body :{}|string) {
        return res.status(status).send(response_body);
    }
}