import { MongoChordRepository } from '../../../external/mongo/chord/mongo-chord-repository'
import { FindChordBySymbol, IFindChordBySymbolUsecase } from '../../../usecases/find-chord-by-symbol-usecase'

export const makeFindChordBySymbolUsecase = (): IFindChordBySymbolUsecase => {
  const mongoChordRepository = new MongoChordRepository()
  const findCHordBySymbolUseCase = new FindChordBySymbol(mongoChordRepository)
  return findCHordBySymbolUseCase
}
