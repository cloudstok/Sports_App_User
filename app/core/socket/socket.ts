
import { Server } from "socket.io";
import { RedisOperations}  from '../redis/redis'
const redis =  new RedisOperations()
export const io = new Server(8084, {   cors: {
        origin: "*",
        methods: ['GET', 'PUT', 'POST']
        //credentials: true
      }
 });


export const firstSUb = async(clientId , roomNo)=>{
  try{
   
    io.to(clientId).emit('commentory', JSON.parse(await redis.getRedis(roomNo+"commentory")));
    io.to(clientId).emit('score', JSON.parse(await redis.getRedis(roomNo+"score")));
  }catch(err){
  
  }

 }



