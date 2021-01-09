import { AddCipherController } from '../../../communication/controllers/cipher/add-cipher-controller'
import { Controller } from '../../../communication/protocols'
import { makeAddCipherUsecase } from '../usecases/add-cipher-usecase-fac'
import { makeCheckIfChordsExistsBySymbolsUsecase } from '../usecases/check-if-chords-exists-by-symbols-usecase-fac'

export const makeAddCipherController = (): Controller => {
  const checkIfChordsExistsBySymbols = makeCheckIfChordsExistsBySymbolsUsecase()
  const addCipherUsecase = makeAddCipherUsecase()
  const addCipherController = new AddCipherController(checkIfChordsExistsBySymbols, addCipherUsecase)
  return addCipherController
}
