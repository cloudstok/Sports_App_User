import * as AWS from 'aws-sdk'
import { appConfig } from '../../config/appConf';
AWS.config.update({
  accessKeyId: appConfig.aws.AWS_ACCESS_KEY,
  region: appConfig.aws.AWS_REGION,
  secretAccessKey : appConfig.aws.AWS_SECRET_KEY,
  signatureVersion: "v4",
});
export class uploads3{
    constructor(){

    }
    async uploadImage(files :any){
        // req.files = files
           const s3 = new AWS.S3();
             const bucketName = appConfig.aws.AWS_S3_BUCKET_NAME;
             const Key = `${Date.now()}_${files[0].originalname.trim()}`;
             const params = { Bucket: bucketName, Key: Key, Body: files[0].buffer, ContentType: files[0].mimetype};
             const urlData = await s3.upload(params).promise()
             return urlData
    }

}

      
     
   

