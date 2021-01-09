import { IFindChordBySymbolUsecase } from '../../../usecases/find-chord-by-symbol-usecase'
import { RequiredParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class FindChordBySymbolController implements Controller {
  constructor (private readonly findChordBySimbolUsecase: IFindChordBySymbolUsecase) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { symbol } = httpRequest?.params
      if (!symbol) return badRequest(new RequiredParamError('symbol'))
      const chord = await this.findChordBySimbolUsecase.exec(symbol)
      return ok(chord)
    } catch (error) {
      return serverError(error)
    }
  }
}
