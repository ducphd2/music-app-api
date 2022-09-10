import redisClient from '@root/config/redis'

const PREFIX = 'MovePlus:authService'

export const incrLockKey = async (key) => redisClient.incr(key)

export const delLockKey = async (key) => redisClient.del(key)

export const setExpireTimeForKey = async (key, expiredTime) => {
  redisClient.expire(key, expiredTime)
}

export const get = async (key) => redisClient.get(key)

export const set = async (key, value) => redisClient.set(key, value)

export const del = (key) => redisClient.del(key)

export const setWithExpire = async (key, value, expire) => redisClient.set(key, value, 'EX', expire)

export const incr = (key) => redisClient.incr(key)

export const genVerifyKey = (email) => `${PREFIX}:verificationCode:${email}`

export const genExpireKey = (email) => `${PREFIX}:expire:${email}`

export const genRetryCountKey = (email) => `${PREFIX}:retryCount:${email}`

export const genCoolDownKey = (email) => `${PREFIX}:coolDown:${email}`

export const genRetryableKey = (email) => `${PREFIX}:retryableCode:${email}`

export const genTokenKey = (email) => `${PREFIX}:accessToken:${email}`

export const genAllKey = (email) => ({
  verifyKey: genVerifyKey(email),
  expireKey: genExpireKey(email),
  retryCountKey: genRetryCountKey(email),
  coolDownKey: genCoolDownKey(email),
  retryableKey: genRetryableKey(email),
  savedTokenKey: genTokenKey(email),
})

export const getAllValue = async (email) => {
  const [verify, expire, retryCount, coolDown, retryableNum, savedToken] = await Promise.all([
    get(genVerifyKey(email)),
    get(genExpireKey(email)),
    get(genRetryCountKey(email)),
    get(genCoolDownKey(email)),
    get(genRetryableKey(email)),
  ])
  return { verify, expire, retryCount, coolDown, retryableNum, savedToken }
}

export const delAllKey = async (email) => {
  await Promise.all([
    del(genVerifyKey(email)),
    del(genExpireKey(email)),
    del(genRetryCountKey(email)),
    del(genCoolDownKey(email)),
    del(genRetryableKey(email)),
  ])
}
