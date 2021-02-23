import { insert, list, edit, remove, getById, searchEmail } from '../repository/usersQuery';
import { User } from '../typed/typed';
import bcrypt from 'bcrypt'
import VerifyEmail from './emails'
import Error from './errors'

export default class UserModel {
  
  async insert(user: User) {  
    this.verifyFieldsEmpty(user.name, user.email, user.passwordHash)
    const email = await this.searchForEmail(user.email)  
    
    if(email){
      throw new Error.InvalidArgumentError("Usuário já cadastrado");
    }else{
      user.passwordHash = await this.generatePasswordHash(user.passwordHash)

      await insert(user)      
      const { id } = await this.searchForEmail(user.email)

      return id
    }
  }

  getUsers() {
    return list()
  }

  async getUserById(id: number) {
    const result = await getById(id);
    return JSON.parse(JSON.stringify(result))[0];
  }

  editUser(user: User,id: number) {
    return edit(user,id)
  }

  deleteUser(id: number) {
    return remove(id)
  }

  async searchForEmail(email: string) {    
    const user = await searchEmail(email)    
    return JSON.parse(JSON.stringify(user))[0];
  }

  generatePasswordHash(password:string) {
    const costHash = 12
    return bcrypt.hash(password,costHash)
  }

  verifyFieldsEmpty(...user: any[]) {
    const fields = [...user]
    fields.forEach(field => { if(field === '' || field.length === 0 ) { throw new Error.InvalidArgumentError("Campo fazio") } })
  }

  sendEmail(address: string, user: User) {
    return VerifyEmail.prototype.sendEmail(address, user)
  }

  verifyEmail(user: User) {
    const id = user.id;
    user.emailVerify = 1    
    return edit(user,id as number)
  }
}
