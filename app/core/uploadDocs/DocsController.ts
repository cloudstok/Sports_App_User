import * as multer  from 'multer'


export const upload = multer({
    fileFilter: function (req:any , file : any , cb :any, res :any){
        const fileSize = parseInt(req.headers["content-length"])
let mimetype = file.mimetype == "image/png" || 
               file.mimetype == "image/jpg" || 
               file.mimetype =='application/pdf' ||
               file.mimetype == "image/jpeg" ||
               file.mimetype == "image/webp" ||

               file.mimetype == "video/mp4" ||
               file.mimetype == "image/avif" 
        if(!mimetype && fileSize <= 22282810){
            cb(null, false)
            console.log("only png / jpg / pdf / jpeg / mp4 / avif file supported")
           return res.send({mgg : "only png & jpg & pdf file supported"})
            
           }
           cb(null, true)
    },
    // limits:{fileSize : 1048576}	      
})   


             