import query from '../infraestracture/database/querys'
import { Post } from '../typed/typed'
import Error from '../models/errors'

export const insert = async (post: Post) => {
  try{
    const sql = 'INSERT INTO Posts SET ?'
    return await query(sql,post)
  }catch(error){
    throw new Error.InternalServerError("Erro ao inserir post")
  }
}

export const list = async () => {
  try{
    const sql = 'SELECT * FROM Posts'
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar posts")
  }
}

export const getById = async (id: number) => {
  try{
    const sql = `SELECT * FROM Posts WHERE id=${id}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar post")
  }
}

export const listByAuthor = async (idAuthor: number) => {
  try{
    const sql = `SELECT * FROM Posts WHERE authorId=${idAuthor}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao buscar post")
  }
}

export const edit = async (posts: Post, id: number) => {
  try{
    const sql = `UPDATE Posts SET ? WHERE id=${id}`
    return await query(sql,posts)
  }catch(error){
    throw new Error.InternalServerError("Erro ao editar post")
  }
}

export const remove = async (id: number, idAuthor: number) => {
  try{
    const sql = `DELETE FROM Posts WHERE id=${id} AND authorId=${idAuthor}`
    return await query(sql)
  }catch(error){
    throw new Error.InternalServerError("Erro ao remover post")
  }
}