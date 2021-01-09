import { IAddChordUsecase } from '../../../usecases/add-chord-usecase'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddChordController implements Controller {
  constructor (private readonly addChordUsecase: IAddChordUsecase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const addedChord = await this.addChordUsecase.exec({
      symbol: httpRequest.body?.symbol,
      imagesUrls: httpRequest.body?.imagesUrls
    })
    return {
      statusCode: 200,
      body: addedChord
    }
  }
}
