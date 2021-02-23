import { Request, Response } from 'express';
import passport from '../controllers/StrategyAuthentication'
import tokens from '../controllers/token'
import UserModel from '../models/usersModel';

export default {
  local(req: Request, res: Response, next: any) {
    passport.authenticate(
      'local',
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error)
        }        
        req.user = user
        return next()
      }
    )(req, res, next)
  },

  bearer(req: any, res: Response, next: any) {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error)
        }
        
        req.token = info.token
        req.user = user
        return next()
      }
    )(req, res, next)
  },

  async refresh (req: any, res: Response, next: any) {
    try {
      const { refreshToken } = req.body
      const id = await tokens.refresh.verify(refreshToken)
      await tokens.refresh.invalid(refreshToken)
      req.user = await UserModel.prototype.getUserById(id)
      return next()
    } catch (error) {
      if (error.name === 'InvalidArgumentError') {
        return res.status(401).json({ error: error.message })
      }
      return res.status(500).json({ error: error.message })
    }
  },

  async verifyEmail (req: Request, res: Response, next: any) {
    try {
      const { token } = req.params 
      const { id } = await tokens.verifyEmail.verify(token)      
      const user = await UserModel.prototype.getUserById(id)
      
      req.user = user
      next()
    } catch (erro) {
      next(erro)
    }
  }
}