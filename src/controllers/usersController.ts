import { Request, Response } from 'express';
import UserModel from "../models/usersModel"
import { User } from '../typed/typed';
import tokens from './token'

export const insertUser = async (req: Request, res: Response) => {  
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    abilitys: req.body.abilitys,
    photo: req.body.photo,
    emailVerify: req.body.emailVerify,
  }
  try {
    const id = await UserModel.prototype.insert(user);
    
    const token = tokens.verifyEmail.create(id) //cria o token
    const address = generateAddress('/api/users/verify_email/',token) //gera o endereço para enviar por email
    UserModel.prototype.sendEmail(address,user) //envia o email

    return res.status(201).json({message: 'Inserido com sucesso'});
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const results = await UserModel.prototype.getUsers()
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await UserModel.prototype.getUserById(id)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}


export const editUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    abilitys: req.body.abilitys,
    photo: req.body.photo,
    emailVerify: req.body.emailVerify,
  }
  try {
    const results = await UserModel.prototype.editUser(req.body, id);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const deletetUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await UserModel.prototype.deleteUser(id);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const login = async (req: any, res: Response, next: any) => {
  try {
    const accessToken = tokens.access.create(req.user.id) //cria o token de usuário logado
    const refreshToken = await tokens.refresh.create(req.user.id) //cria um refresh token para o usuário permanecer logado
    res.set('Authorization', accessToken)
    res.status(200).json({ refreshToken })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: any, res: Response, next: any) => {
  try {
    const token = req.token
    await tokens.access.invalid(token) //invalida o token, para que ele seja deslogado
    res.status(204).json()
  }catch(error) {
    next(error)
  }
}

export const verifyEmail = async (req: any, res: Response, next: any) => {
  try {
    const user = req.user    
    await UserModel.prototype.verifyEmail(user)
    res.status(200).json()
  } catch (error) {
    next(error)
  }
}

const generateAddress = (route: string, token: string) => {
  const URL = 'localhost:3000'
  return `${URL}${route}${token}`
}