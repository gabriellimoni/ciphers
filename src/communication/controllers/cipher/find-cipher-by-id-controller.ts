import { NotFoundError, RequiredParamError } from '../../errors'
import { badRequest, notFound, ok, serverError } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { IFindCipherByIdUsecase } from '../../../usecases/find-cipher-by-id-usecase'

export class FindCipherByIdController implements Controller {
  constructor (
    private readonly findCipherByIdUsecase: IFindCipherByIdUsecase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cipherId = httpRequest.params?.cipherId
      if (!cipherId) return badRequest(new RequiredParamError('cipherId'))
      const cipher = await this.findCipherByIdUsecase.exec(cipherId)
      if (!cipher) return notFound(new NotFoundError('Cipher', 'cipherId'))
      return ok(cipher)
    } catch (error) {
      return serverError(error)
    }
  }
}
