import * as Joi from 'joi'
import { validData } from './validData';
    export const register = Joi.object().keys({
        user_id: validData.alphaNum,
        password: validData.alphaNum,
      });
    export const login = Joi.object().keys({
        user_id: validData.alphaNum,
        user_password: validData.alphaNum,
      });
    export const reel = Joi.object().keys({
        PageLimit: validData.number,
        PageOffset: validData.number,
      });

      


