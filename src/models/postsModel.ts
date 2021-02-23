import { insert, list, edit, remove, getById, listByAuthor } from '../repository/postsQuery';
import { Post } from '../typed/typed';
import Error from './errors'

export default class PostModel {

  insert(post: Post) {
    this.verifyFields(post.message, post.imagePost)
    return insert(post)
  }

  getPostById(id: number) {
    return getById(id)
  }

  deletePost(id: number, idAuthor: number) {
    return remove(id, idAuthor)
  }

  editPost(post: Post, id: number) {
    return edit(post, id)
  }

  listByAuthor(idAuthor: number) {
    return listByAuthor(idAuthor)
  }

  getPosts() {
    return list()
  }

  //Verifica se há algum campo vazio
  verifyFields(...posts: any[]) {
    const fields = [...posts]
    let count = 0;
    fields.forEach(field => field.length === 0 ? count++ : null)
    if(count >=2) {throw new Error.InvalidArgumentError("Preencha um dos campos") }
  }
}