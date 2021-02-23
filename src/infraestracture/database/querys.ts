import { User } from '../../typed/typed'
import conection from './conection'

const executeQuery = (query: string, parameters = {}) => {
  return new Promise<User>((resolve, reject) => {
    conection.query(query, parameters, (errors, results) => {
      if(errors) {
        reject(errors)
      }else{
        resolve(results)
      }
    })
  })
}

export default executeQuery