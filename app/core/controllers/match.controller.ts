import { object } from "joi";
import { connection } from "../../config/dbConf";
import { ResponseInterceptor } from "../utilities/response-interceptor";

export class match extends ResponseInterceptor{
    connection : connection
    constructor(){
        super()
        this.connection = new connection()
    }

    async get_match(req:any, res: any){
        try{
          let sql = "select  * from cricket_match"
          let [tournament]  = await this.connection.write.query(sql);
          return this.sendSuccess(res, { data: tournament })
        }
        catch(err){
              console.log(err)
        }
    }

    async imageURL(code){
      let country  = "select * from countries where code = ?" 
      let [countries] = await this.connection.write.query(country ,  [code])
      if(countries && countries[0]?.['imgURl'] !== undefined){
        return countries[0]?.['imgURl']
      }else{
        return ""
      }
    }
    async point_table(req:any, res: any){
        try{
          let sql = "select * from result_table where tou_key = ? limit ? offset ?"
          let [table] : any = await this.connection.write.query(sql , [req.query.tou_key , +req.query.limit , +req.query.offset]);
          table[0].rounds = JSON.parse(table[0].rounds)
            for(let x of table){
              for(let y of x.rounds){
                for(let z of y.groups){
                  for(let w of z.points){
                    w.team.imageURL = await this.imageURL(w.team.code) 
                    console.log(w.team.imageURL, "yooo" )
                  
                  }
              
                }
              }
            }

          return this.sendSuccess(res, { data: table })
        }
        catch(err){
              console.log(err)
        }
    }



}

