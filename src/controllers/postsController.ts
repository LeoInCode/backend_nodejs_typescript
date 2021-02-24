import { Request, Response } from "express";
import moment from 'moment'
import PostModel from "../models/postsModel";
import { Post } from "../typed/typed";

export const insertPost = async (req: Request, res: Response) => {
  try {
    const createAt = moment().format('YYYY-MM-DD HH:MM:SS') //insere a data atual no momento da inserção
    const post: Post = {
      message: req.body.message,
      imagePost: req.body.imagePost,
      author: req.body.author,
      authorId: req.body.authorId,
      createAt: createAt
    }
    const results = await PostModel.prototype.insert(post)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const results = await PostModel.prototype.getPosts()
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getPostById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await PostModel.prototype.getPostById(id)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const editPost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const post: Post = {
    message: req.body.message,
    imagePost: req.body.imagePost,
    author: req.body.author,
    authorId: req.body.authorId,
  }
  try {
    const results = await PostModel.prototype.editPost(post, id);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const deletePost = async (req: any, res: Response) => {
   const id = parseInt(req.params.id)
   req.body.authorId = parseInt(req.user.id)
  try {
    const results = await PostModel.prototype.deletePost(id, req.body.authorId);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const listByAuthor = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await PostModel.prototype.listByAuthor(id)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}
