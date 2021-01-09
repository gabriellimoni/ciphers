import { IAddChordUsecase } from '../../../usecases/add-chord-usecase'
import { RequiredParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddChordController implements Controller {
  constructor (private readonly addChordUsecase: IAddChordUsecase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['symbol', 'imagesUrls']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new RequiredParamError(field))
        }
      }
      const addedChord = await this.addChordUsecase.exec({
        symbol: httpRequest.body?.symbol,
        imagesUrls: httpRequest.body?.imagesUrls
      })
      return ok(addedChord)
    } catch (error) {
      return serverError(error)
    }
  }
}
