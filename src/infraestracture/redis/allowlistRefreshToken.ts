import redis from 'redis'
import manipulatedList from './manipulatedList'
const allowlist = redis.createClient({ prefix: 'allowlistRefreshToken:' })

export default manipulatedList(allowlist)