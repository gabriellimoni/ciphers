import { IAddChordUsecase } from '../../../usecases/add-chord-usecase'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddChordController implements Controller {
  constructor (private readonly addChordUsecase: IAddChordUsecase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addedChord = await this.addChordUsecase.exec({
        symbol: httpRequest.body?.symbol,
        imagesUrls: httpRequest.body?.imagesUrls
      })
      return {
        statusCode: 200,
        body: addedChord
      }
    } catch (error) {
      return {
        statusCode: 500
      }
    }
  }
}
