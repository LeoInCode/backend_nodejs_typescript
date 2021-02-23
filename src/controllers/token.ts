import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import moment from 'moment'

import Error from '../models/errors'

import allowlistRefreshToken from '../infraestracture/redis/allowlistRefreshToken'
import blocklistAccessToken from '../infraestracture/redis/blocklistAccessToken'

/**
 * Cria o token no momento em que um novo usuário é inserido. Retorna um token
 * @param id 
 * @param param1 
 */
function createTokenJWT (id: number, [timeQuantity, timeUnity]: any) {
  const payload = { id }
  const token = jwt.sign(payload, process.env.CHAVE_JWT as string, {
    expiresIn: timeQuantity + timeUnity
  })
  return token
}

/**
 * Veirifca se já um token válido, e retorna o id referente ao token
 * @param token 
 * @param name 
 * @param blocklist 
 */
async function verifyTokenJWT (token: string, name: string, blocklist?: any) {  
  await verifyTokenNaBlocklist(token, name, blocklist)
  const id = jwt.verify(token, process.env.CHAVE_JWT as string)
  return id
}

/**
 * Verifica se contém o token na blocklist, o que significa que o usuário não está mais logado
 * @param token 
 * @param name 
 * @param blocklist 
 */
async function verifyTokenNaBlocklist (token: string, name: string, blocklist: any) {
  if (!blocklist) {    
    return
  }

  const tokenNaBlocklist = await blocklist.containsToken(token)
  if (tokenNaBlocklist) {
    throw new jwt.JsonWebTokenError(`${name} inválido por logout!`)
  }
}

/**
 * Invalida o token
 * @param token 
 * @param blocklist 
 */
function invalidTokenJWT(token: string, blocklist: any) {
  return blocklist.add(token)
}

/**
 * Cria um token opaco para dar um refresh
 * @param id 
 * @param param1 
 * @param allowlist 
 */
async function createTokenOpacity(id: number, [timeQuantity, timeUnity]: any, allowlist: any) {
  const tokenOpacity = crypto.randomBytes(24).toString('hex')
  const dateExpiration = moment().add(timeQuantity, timeUnity).unix()
  await allowlist.add(tokenOpacity, id, dateExpiration)
  return tokenOpacity
}

/**
 * Verifica o token opaco que foi criado
 * @param token
 * @param name 
 * @param allowlist 
 */
async function verifyTokenOpacity(token: string, name: string, allowlist?: any) {
  verifyTokenSend(token, name)
  const id = await allowlist.searchValue(token)
  verifyTokenValido(id, name)
  return id
}

/**
 * Invalida o token opaco
 * @param token 
 * @param allowlist 
 */
async function invalidTokenOpacity(token: string, allowlist: any) {
  await allowlist.deleta(token)
}

/**
 * Verifica se o token é válido
 * @param id 
 * @param name 
 */
function verifyTokenValido(id: number, name: string) {
  if (!id) {
    throw new Error.InvalidArgumentError(`${name} inválido!`)
  }
}

/**
 * Verifica se foi enviado um token
 * @param token 
 * @param name 
 */
function verifyTokenSend(token: string, name: string) {
  if (!token) {
    throw new Error.InvalidArgumentError(`${name} não enviado!`)
  }
}

export default {
  /**
   * Acess token é para criar um token, verificar se está ativo, e invalidar ele
   */
  access: {
    name: 'access token',
    list: blocklistAccessToken,
    expiration: [15, 'm'],
    create(id: number) {
      return createTokenJWT(id, this.expiration)
    },
    verify(token: string) {
      return verifyTokenJWT(token, this.name, this.list)
    },
    invalid(token: string) {
      return invalidTokenJWT(token, this.list)
    }
  },
  /**
   * Serve para criar um token opaco, para manter o usuário ativo
   */
  refresh: {
    name: 'refresh token',
    list: allowlistRefreshToken,
    expiration: [5, 'd'],
    create(id: number) {
      return createTokenOpacity(id, this.expiration, this.list)
    },
    verify (token: string) {
      return verifyTokenOpacity(token, this.name, this.list)
    },
    invalid (token: string) {
      return invalidTokenOpacity(token, this.list)
    }
  },
  /**
   * Cria o token enviado por email, e também verifica se está ativo esse token
   */
  verifyEmail: {
    name: 'token verify email',
    expiration: [1, 'h'],
    create(id: number) {
      return createTokenJWT(id, this.expiration)
    },
    verify (token: string) {
      return verifyTokenJWT(token, this.name)
    }
  }
}
