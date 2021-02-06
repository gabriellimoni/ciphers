import { MongoCipherRepository } from '../../../external/mongo/cipher/mongo-cipher-repository'
import { FindCipherByIdUsecase, IFindCipherByIdUsecase } from '../../../usecases/find-cipher-by-id-usecase'

export const makeFindCipherByIdUsecase = (): IFindCipherByIdUsecase => {
  const mongoCipherRepo = new MongoCipherRepository()
  const findCipherByIdUseCase = new FindCipherByIdUsecase(mongoCipherRepo)
  return findCipherByIdUseCase
}
