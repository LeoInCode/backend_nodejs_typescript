class InvalidArgumentError extends Error {
  constructor (mensagem: string) {
    super(mensagem)
    this.name = 'InvalidArgumentError'
  }
}

class InternalServerError extends Error {
  constructor (mensagem: string) {
    super(mensagem)
    this.name = 'InternalServerError'
  }
}

class NotAuthorized extends Error {
  constructor () {
    const mensagem = 'Não foi possível acessar esse recurso'
    super(mensagem)
    this.name = 'NotAuthorized'
  }
}

export default { InvalidArgumentError, InternalServerError, NotAuthorized }