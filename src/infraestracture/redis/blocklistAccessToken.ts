import redis from 'redis'
import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'
import manipulatedList from './manipulatedList'

const blocklist = redis.createClient({ prefix: 'blocklistAccessToken:' })
const manipulatedBlockList = manipulatedList(blocklist)

const generateTokenHash = (token: string) => {
  return createHash('sha256').update(token).digest('hex')
}

export default {
  async add(token: string) {
    const dateExpiration = jwt.decode(token).exp
    const tokenHash = generateTokenHash(token)
    await manipulatedBlockList.add(tokenHash, '', dateExpiration)
  },

  async containsToken(token: string) {
    const tokenHash = generateTokenHash(token)
    return manipulatedBlockList.containsKey(tokenHash)
  }

}