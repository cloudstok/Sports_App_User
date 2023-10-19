import * as Joi from 'joi'
import { validData } from './validData';
import { otpController } from 'core/controllers/otp.controller';
    export const register = Joi.object().keys({
        phone: validData.number,
        password: validData.alphaNum,
        otp : validData.number,
        otp_id : validData.number
      });
    export const login = Joi.object().keys({
        phone: validData.number,
        password: validData.alphaNum,
      });
    export const reel = Joi.object().keys({
        PageLimit: validData.number,
        PageOffset: validData.number,
      });


      export const match_fixtures = Joi.object().keys({
        limit: validData.limit,
        offset: validData.limit,
        date : validData.string,
      });

      export const match = Joi.object().keys({
        limit: validData.limit,
        offset: validData.limit,
       
      });
      export const commentory = Joi.object().keys({
        match_key : validData.string,
        limit: validData.limit,
        offset: validData.limit,
       
      });
      


