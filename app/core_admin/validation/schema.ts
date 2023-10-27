import * as Joi from 'joi'
import { validData } from './validData';
    export const register = Joi.object().keys({
      phone: validData.number,
      password: validData.alphaNum,
      });

      export const findbyid = Joi.object().keys({
        phone : validData.number
      })


