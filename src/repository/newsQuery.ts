import query from '../infraestracture/database/querys'
import { News } from '../typed/typed'
import Error from '../models/errors'

export const insert = async (news: News) => {
  try{
    const sql = 'INSERT INTO News SET ?'
    return await query(sql,news)
  }catch(error){
    throw new Error.InternalServerError("Erro ao inserir news")
  }
}

export const list = async () => {
  try{
    const sql = 'SELECT * FROM News'
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar news")
  }
}

export const getById = async (id: number) => {
  try{
    const sql = `SELECT * FROM News WHERE id=${id}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar news")
  }
}

export const edit = async (news: News, id: number) => {
  try{
    const sql = `UPDATE News SET ? WHERE id=${id}`
    return await query(sql,news)
  }catch(error){
    throw new Error.InternalServerError("Erro ao editar news")
  }
}

export const remove = async (id: number) => {
  try{
    const sql = `DELETE FROM News WHERE id=${id}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao remover news")
  }
}