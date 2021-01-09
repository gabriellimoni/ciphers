import { FindChordBySymbolController } from '../../../communication/controllers/chord/find-chord-by-symbol-controller'
import { Controller } from '../../../communication/protocols'
import { makeFindChordBySymbolUsecase } from '../usecases/find-chord-by-symbol-usecase-fac'

export const makeFindChordBySymbolController = (): Controller => {
  const findChordBySymbolUsecase = makeFindChordBySymbolUsecase()
  const findChordBySymbolController = new FindChordBySymbolController(findChordBySymbolUsecase)
  return findChordBySymbolController
}
