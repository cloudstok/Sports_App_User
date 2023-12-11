//------------------------------------------------------------------------------------------------------------
import { io } from '../../socket/socket';
import { RedisOperations } from '../../redis/redis'

const redis = new RedisOperations()
export const score = async (data, key) => {
    io.to(key).emit("score", data)
    await redis.setRedis(key + "score", JSON.stringify(data), 60 * 3)
    return true
}

export const commentary = async (data, key) => {
    io.to(key).emit("commentory", data)
    await redis.setRedis(key + "commentory", JSON.stringify(data), 60 * 3)
    return true
}



