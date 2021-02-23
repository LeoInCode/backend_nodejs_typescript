import { Connection } from "mysql"

class Tables {
  constructor(private conection: Connection) { }

  init(conection: Connection) {
    this.conection = conection

    this.createTableUsers()
    this.createTablePosts()
    this.createTableNews()
  }

  async createTableUsers() {
    const TABLE_USERS = `CREATE TABLE IF NOT EXISTS Users (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(30) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      passwordHash varchar(255) NOT NULL,
      abilitys varchar(100),
      photo varchar(250),
      emailVerify int,
      PRIMARY KEY(id)
    )`
    this.conection.query(TABLE_USERS, error => {
      if(error) {
        console.log(error);
      }else{
        console.log("Tabela Users criada com sucesso")
      }
    })
  }

  createTablePosts() {
    const TABLE_POSTS = `CREATE TABLE IF NOT EXISTS Posts (
      id int NOT NULL AUTO_INCREMENT,
      author varchar(30),
      message varchar(255),
      imagePost varchar(250),
      authorId int,
      createAt datetime,
      PRIMARY KEY(id),
      FOREIGN KEY (authorId) REFERENCES Users(id)
    )`
    this.conection.query(TABLE_POSTS, error => {
      if(error) {
        console.log(error);
      }else{
        console.log("Tabela Posts criada com sucesso")
      }
    })
  }
  createTableNews() {
    const TABLE_POSTS = `CREATE TABLE IF NOT EXISTS News (
      id int NOT NULL AUTO_INCREMENT,
      title varchar(30),
      createAt datetime NOT NULL,
      PRIMARY KEY(id)
    )`
    this.conection.query(TABLE_POSTS, error => {
      if(error) {
        console.log(error);
      }else{
        console.log("Tabela News criada com sucesso")
      }
    })
  }
}

export default Tables