import { MongoCipherRepository } from '../../../external/mongo/cipher/mongo-cipher-repository'
import { AddCipherUsecase, IAddCipherUsecase } from '../../../usecases/add-cipher-usecase'

export const makeAddCipherUsecase = (): IAddCipherUsecase => {
  const mongoCipherRepository = new MongoCipherRepository()
  const addCipherUsecase = new AddCipherUsecase(mongoCipherRepository)
  return addCipherUsecase
}
