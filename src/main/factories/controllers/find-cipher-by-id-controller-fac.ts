import { FindCipherByIdController } from '../../../communication/controllers/cipher/find-cipher-by-id-controller'
import { Controller } from '../../../communication/protocols'
import { makeFindCipherByIdUsecase } from '../usecases/find-cipher-by-id-usecase-fac'

export const makeFindCipherByIdController = (): Controller => {
  const findCipherByIdUsecase = makeFindCipherByIdUsecase()
  const findCipherByIdController = new FindCipherByIdController(findCipherByIdUsecase)
  return findCipherByIdController
}
