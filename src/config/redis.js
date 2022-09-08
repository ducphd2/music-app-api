import Redis from 'ioredis'

const redisClient = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || '',
})

export default redisClient