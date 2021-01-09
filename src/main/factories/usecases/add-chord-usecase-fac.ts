import { MongoChordRepository } from '../../../external/mongo/chord/mongo-chord-repository'
import { AddChordUsecase, IAddChordUsecase } from '../../../usecases/add-chord-usecase'

export const makeAddChordUsecase = (): IAddChordUsecase => {
  const mongoChordRepository = new MongoChordRepository()
  const addChordUseCase = new AddChordUsecase(mongoChordRepository, mongoChordRepository)
  return addChordUseCase
}
