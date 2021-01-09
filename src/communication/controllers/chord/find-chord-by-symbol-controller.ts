import { IFindChordBySymbolUsecase } from '../../../usecases/find-chord-by-symbol-usecase'
import { serverError } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class FindChordBySymbolController implements Controller {
  constructor (private readonly findChordBySimbolUsecase: IFindChordBySymbolUsecase) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.findChordBySimbolUsecase.exec('')
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
