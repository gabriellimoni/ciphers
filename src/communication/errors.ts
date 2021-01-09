export class RequiredParamError extends Error {
  constructor (param: string) {
    super(`${param} is required`)
    this.name = 'RequiredParamError'
  }
}
