export class RequiredParamError extends Error {
  constructor (param: string) {
    super(`${param} is required`)
    this.name = 'RequiredParamError'
  }
}

export class EntityAlreadyExistsError extends Error {
  constructor (entity: string, byParam?: string) {
    let message = `${entity} already exists`
    if (byParam) message += ` with this ${byParam}`
    super(message)
    this.name = 'EntityAlreadyExistsError'
  }
}

export class NotFoundError extends Error {
  constructor (entity: string, byParam?: string) {
    let message = `${entity} not found`
    if (byParam) message += ` with this ${byParam}`
    super(message)
    this.name = 'NotFoundError'
  }
}
export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`${param} is invalid`)
    this.name = 'InvalidParamError'
  }
}
