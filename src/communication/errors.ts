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
