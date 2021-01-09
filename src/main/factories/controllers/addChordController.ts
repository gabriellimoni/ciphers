import { AddChordController } from '../../../communication/controllers/chord/add-chord-controller'
import { Controller } from '../../../communication/protocols'
import { InMemoryChordRepository } from '../../../external/memory/chord/in-memory-chord-repository'
import { AddChordUsecase } from '../../../usecases/add-chord-usecase'

export const makeAddChordController = (): Controller => {
  const inMemoryChordRepository = new InMemoryChordRepository()
  const addChordUsecase = new AddChordUsecase(inMemoryChordRepository, inMemoryChordRepository)
  const addChordController = new AddChordController(addChordUsecase)
  return addChordController
}
