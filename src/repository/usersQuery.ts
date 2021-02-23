import query from '../infraestracture/database/querys'
import { User } from '../typed/typed'
import Error from '../models/errors'

export const insert = async (user: User) => {
  try{
    const sql = 'INSERT INTO Users SET ?'
    return await query(sql,user)
  }catch(error){
    throw new Error.InternalServerError("Erro ao inserir usuário")
  }
}

export const list = async () => {
  try{
    const sql = 'SELECT * FROM Users'
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar usuários")
  }
}

export const getById = async (id:number) => {
  try{
    const sql = `SELECT * FROM Users WHERE id=${id}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar usuários")
  }
}

export const edit = async (user: User, id: number) => {
  try{
    const sql = `UPDATE Users SET ? WHERE id=${id}`
    return await query(sql,user)
  }catch(error){
    throw new Error.InternalServerError("Erro ao editar usuário")
  }
}

export const remove = async (id: number) => {
  try{
    const sql = `DELETE FROM Users WHERE id=${id}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao remover usuário")
  }
}

export const searchEmail = async (email: string) => {
  try{
    const sql = `SELECT * FROM Users WHERE email = '${email}'`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao encontrar usuário")
  }
}