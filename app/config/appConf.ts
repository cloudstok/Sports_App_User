
const dotenv = require("dotenv");
dotenv.config();

let SERVER_ENV = verifyenv("SERVER_ENV") || "dev";
let SERVER_PORT = Number(verifyenv("SERVER_PORT")) || 8080;
let DB_URL = verifyenv("DB_URL") || "";
let JWT_SECRET_KEY = verifyenv("JWT_SECRET_KEY") || "";
let JWT_EXPIRATION_TIME = verifyenv("JWT_EXPIRATION_TIME") || "";
let REDIS_HOST= verifyenv("REDIS_HOST") || ""
let AWS_S3_BUCKET_NAME = verifyenv("AWS_S3_BUCKET_NAME") || "";
let AWS_ACCESS_KEY = verifyenv("AWS_ACCESS_KEY") || ""
let AWS_SECRET_KEY = verifyenv("AWS_SECRET_KEY") || ""
let AWS_REGION = verifyenv("AWS_REGION") || ""


let PROJECT_KEY = verifyenv("PROJECT_KEY") || ""
let RS_TOKEN = verifyenv("RS_TOKEN") || ""
// let RS_TOKEN = credDetails.token
let API_KEY = verifyenv("API_KEY") || ""



function verifyenv(env_key : string) {
  if (process.env[env_key] == undefined) {
    console.log(`[ENV] DEFAULT VALUE has taken for ${env_key}`);
    return undefined;
  } else {
    return process.env[env_key];
  }
}

export const appConfig = {
  server_env: SERVER_ENV, //['dev','uat']sr
  ver: '0.0.1',
  path: "/user/v1",
  adminpath: "/admin/v1",
  redisHost: REDIS_HOST,
  server: {
    port: SERVER_PORT,
  },
  PROJECT_KEY : PROJECT_KEY,
  API_KEY: API_KEY,
  RS_TOKEN :RS_TOKEN,
    uri: DB_URL,
  
  jwt: {
    jwtSecretKey: JWT_SECRET_KEY,
    jwtExpiry: JWT_EXPIRATION_TIME
  },
  aws :{
    AWS_S3_BUCKET_NAME : AWS_S3_BUCKET_NAME,
    AWS_ACCESS_KEY : AWS_ACCESS_KEY,
    AWS_SECRET_KEY : AWS_SECRET_KEY,
    AWS_REGION : AWS_REGION
  }

};

// import { RedisOperations } from '../core/redis/redis'
// const redis = new RedisOperations()
// async function token() {
//   let data = await JSON.parse( await redis.getRedis("token") )
//   return data
// } 
// let credDetails: any = async function(){ await token()}()
// console.log(credDetails , "vishal")