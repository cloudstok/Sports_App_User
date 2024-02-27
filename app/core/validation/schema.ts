import * as Joi from 'joi'
import { validData } from './validData';

const otp= validData.number
const otp_id = validData.number
const password = validData.alphaNum
const device_id =validData.string
const match_key= validData.string
const reel_id = validData.number
const limit= validData.limit
const offset = validData.limit
const phone =  validData.number
const comment = validData.string
const comment_id = validData.number
const like_id = validData.number
export const getComment = Joi.object().keys({reel_id});
// export const updateCommentBody=Joi.object().keys({reel_id,phone,comment})
export const updateCommentQuery=Joi.object().keys({comment_id, reel_id,phone,comment})
export const addCommentQuery=Joi.object().keys({reel_id,phone,comment })
export const commentory = Joi.object().keys({match_key,limit,offset})
export const match = Joi.object().keys({limit,offset})
export const reel = Joi.object().keys({ limit, offset})
// export const match_fixtures = Joi.object().keys({  limit,  offset,  date: validData.string,})
export const login = Joi.object().keys({phone,password,device_id})
export const sendOtp = Joi.object().keys({phone});
export const register = Joi.object().keys({phone,password, otp_id});
export const verifyOtp = Joi.object().keys({phone,otp,otp_id})