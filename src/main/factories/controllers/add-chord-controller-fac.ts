import { AddChordController } from '../../../communication/controllers/chord/add-chord-controller'
import { Controller } from '../../../communication/protocols'
import { makeAddChordUsecase } from '../usecases/add-chord-usecase-fac'

export const makeAddChordController = (): Controller => {
  const addChordUsecase = makeAddChordUsecase()
  const addChordController = new AddChordController(addChordUsecase)
  return addChordController
}
