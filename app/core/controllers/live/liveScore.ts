//------------------------------------------------------------------------------------------------------------
import { io } from '../../socket/socket';
import {RedisOperations} from '../../redis/redis'
import { json } from 'stream/consumers';
const redis = new RedisOperations()
export const score = async(data)=> {
    let scoreData = data.data
    let finalObj = {}
    finalObj['innings'] = scoreData.play.innings;
    finalObj['live'] = scoreData.play.live
    io.to(scoreData.key).emit("score" , finalObj)
    await redis.setRedis(scoreData.key+"score" , JSON.stringify(finalObj))
    // console.log(scoreData.key , await redis.getRedis(scoreData.key) )
    return true
}

export const commentary = async(data)=> {
    let scoreData = data.data
    let finalObj = {}
    finalObj['commentory'] = Object.values(scoreData.play.related_balls);
    finalObj['live'] = scoreData.play.live
    io.to(scoreData.key).emit("commentory" , finalObj)
    await redis.setRedis(scoreData.key+"commentory" , JSON.stringify(finalObj))
    return true
} 



