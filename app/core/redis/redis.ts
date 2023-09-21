import Redis from 'ioredis';

// Create a Redis client instance
const redis = new Redis({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
  password: '',      // Optional: Redis server password, if set
});

// Handle errors
redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});


// Perform Redis operations
export default  class RedisOperations{
    redis = redis
    constructor(){
     this.redis = redis
    }
 // Set a key-value pair in Redis
   async setRedis( key , value){
    try{
       const setData =  await this.redis.set(key, value);
       return setData
    }catch(err){
        console.error(err)
    }
    }
 // Get the value associated with a key
    async getRedis(key){
        try{
            const value = await this.redis.get(key);
            console.log('Value:', value);
            return value
        }catch(err){
            console.error(err)
        }
    }
 // Delete a key
   async deleteRedis(key){
       const delDate =  await this.redis.del(key);
       return delDate
    }
    //Store and retrieve a map.  or set JSON data
    async hsetRedis(key , value){
        try{
            const hsetData = await this.redis.hset(key ,value)
            return hsetData
        }catch(err){
            console.error(err)
        }
    }
    //get JSON data
    async hgetRedis(key){
        try{
            const hgetData=  await this.redis.hgetall(key)
            return JSON.stringify(hgetData , null , 2)
        }catch(err){
            console.error(err)
        }
    }
    // Close the Redis connection when done
    async closeRedis(){
        await redis.quit();
  
    } 

}


