import { Router } from "express";
import { getNews, getNewsById, insertNews, editNews, deleteNews } from './../controllers/newsController';

const newsRoute = Router()

newsRoute.get('/news', getNews)
newsRoute.get('/news/:id', getNewsById)
newsRoute.post('/news', insertNews)
newsRoute.put('/news/:id', editNews)
newsRoute.delete('/news/:id', deleteNews)

export default newsRoute