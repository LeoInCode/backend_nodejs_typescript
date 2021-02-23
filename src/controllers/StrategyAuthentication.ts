import passport from 'passport'
import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'
import { User } from './../typed/typed';
import UserModel from '../models/usersModel'
import tokens from './token'
import Error from '../models/errors'

//Verifica se o usuário possui autorização
const verifyUser = (user: User) => {
  if(!user) {
    throw new Error.NotAuthorized()
  }
}

/**
 * Compara se a senha digitada, é a mesma senha contida no banco, faz isso descriptografando aquela
 */
async function verifyPassword(password: string, passwordHash: string) {
  const validPassword = await bcrypt.compare(password, passwordHash)
  if(!validPassword){
    throw new Error.NotAuthorized()
  }
}

/**
 * Local é utilizado para autenticar se o é o mesmo usuário já cadastrado
 */
passport.use(
  new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
    try{
      const user = await UserModel.prototype.searchForEmail(email)
      verifyUser(user)
      await verifyPassword(password, user.passwordHash)
      
      done(null,user)
    }catch(error){
      done(error)
    }
  }
  )
)

/**
 * Bearer verifica se o token que foi passado, é referente a algum usuário do banco
 */
passport.use(
  new BearerStrategy.Strategy(async (token, done) => {
      try{
        const { id } = await tokens.access.verify(token)
        const user = await UserModel.prototype.getUserById(id)
                
        done(null, user, { token })
      }catch(error){
        done(error)
      }
    }
  )
)

export default passport