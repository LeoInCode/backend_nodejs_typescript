import { insert, list, edit, remove, getById } from '../repository/newsQuery';
import { News } from '../typed/typed';
import Error from './errors'

export default class NewsModel {
  
  insert(news: News) {
    if(news.title.length === 0) {throw new Error.InvalidArgumentError("Preencha o campo selecionado")}
    return insert(news)
  }

  getNewsById(id: number) {
    return getById(id)
  }

  deleteNews(id: number) {
    return remove(id)
  }

  editNews(post: News, id: number) {
    return edit(post, id)
  }

  getNews() {
    return list()
  }
}