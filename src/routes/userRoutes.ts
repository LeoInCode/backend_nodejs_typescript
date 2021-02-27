import { Router } from "express";
import { getUsers, insertUser, editUser, deletetUser, getUserById, login, logout, verifyEmail } from '../controllers/usersController'
import authenticationMiddleware from '../middlewares/authenticationMiddleware'

const usersRoute = Router()

usersRoute.route('/users').get(authenticationMiddleware.bearer, getUsers)
usersRoute.route('/users/:id').get([authenticationMiddleware.bearer, authenticationMiddleware.local], getUserById)
usersRoute.post('/users', insertUser)
usersRoute.route('/users/:id').put([authenticationMiddleware.bearer, authenticationMiddleware.local], editUser)
usersRoute.route('/users/login').post(authenticationMiddleware.local, login)
usersRoute.route('/users/logout').post([authenticationMiddleware.refresh, authenticationMiddleware.bearer], logout)
usersRoute.route('/users/:id').delete([authenticationMiddleware.bearer, authenticationMiddleware.local], deletetUser)
usersRoute.route('/users/verify_email/:token').get(authenticationMiddleware.verifyEmail, verifyEmail)
usersRoute.route('/users/refresh_token').post(authenticationMiddleware.refresh, login)
export default usersRoute