import { Router } from "express";
import { getPosts, getPostById, insertPost, editPost, deletePost, listByAuthor } from './../controllers/postsController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware'

const postsRoute = Router()

postsRoute.get('/posts', getPosts)
postsRoute.get('/posts/:id', getPostById)
postsRoute.route('/posts').post(authenticationMiddleware.bearer, insertPost)
postsRoute.put('/posts/:id', editPost)
postsRoute.get('/users/:id/posts', listByAuthor)
postsRoute.route('/posts/:id').delete(authenticationMiddleware.bearer, deletePost)

export default postsRoute