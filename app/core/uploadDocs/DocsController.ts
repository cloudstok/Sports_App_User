import * as multer  from 'multer'


export const upload = multer({
    fileFilter: function (req:any , file : any , cb :any){
let mimetype = file.mimetype == "image/png" || 
               file.mimetype == "image/jpg" || 
               file.mimetype =='application/pdf' ||
               file.mimetype == "image/jpeg" ||
               file.mimetype == "video/mp4";
        if(!mimetype){
            cb(null, false)
            console.log("only png & jpg & pdf file supported")
           }
           cb(null, true)
    },
   //  limits:{fileSize : 1024 * 1}	      
})   


             