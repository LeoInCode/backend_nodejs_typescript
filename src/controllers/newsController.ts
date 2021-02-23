import { Request, Response } from 'express';
import moment from 'moment'
import NewsModel from "../models/newsModel"

export const insertNews = async (req: Request, res: Response) => {  
  try {
    const createAt = moment().format('YYYY-MM-DD HH:MM:SS') //insere a data atual no momento da inserção
    const news = {...req.body, createAt}
    const result = await NewsModel.prototype.insert(news);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getNews = async (req: Request, res: Response) => {
  try {
    const results = await NewsModel.prototype.getNews()
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getNewsById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await NewsModel.prototype.getNewsById(id)
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const editNews = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await NewsModel.prototype.editNews(req.body, id);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const deleteNews = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const results = await NewsModel.prototype.deleteNews(id);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
}