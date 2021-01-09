import { FindChordBySymbolController } from '../../../communication/controllers/chord/find-chord-by-symbol-controller'
import { Controller } from '../../../communication/protocols'
import { InMemoryChordRepository } from '../../../external/memory/chord/in-memory-chord-repository'
import { FindChordBySymbol } from '../../../usecases/find-chord-by-symbol-usecase'

export const makeFindChordBySymbolController = (): Controller => {
  const inMemoryChordRepository = new InMemoryChordRepository()
  const addChordUsecase = new FindChordBySymbol(inMemoryChordRepository)
  const findChordBySymbolController = new FindChordBySymbolController(addChordUsecase)
  return findChordBySymbolController
}
