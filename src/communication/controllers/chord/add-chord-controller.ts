import { IAddChordUsecase } from '../../../usecases/add-chord-usecase'
import { EntityAlreadyExistsError, RequiredParamError } from '../../errors'
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
      if (!addedChord) {
        return badRequest(new EntityAlreadyExistsError('Chord', 'symbol'))
      }
      return ok(addedChord)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
