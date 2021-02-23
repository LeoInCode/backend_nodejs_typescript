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

class NotFound extends Error {
  constructor (entidade: string) {
    const mensagem = `Não foi possível encontrar ${entidade}`
    super(mensagem)
    this.name = 'NotFound'
  }
}

class NotAuthorized extends Error {
  constructor () {
    const mensagem = 'Não foi possível acessar esse recurso'
    super(mensagem)
    this.name = 'NotAuthorized'
  }
}

export default { InvalidArgumentError, InternalServerError, NotFound, NotAuthorized }