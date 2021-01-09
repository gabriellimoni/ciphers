import { MongoChordRepository } from '../../../external/mongo/chord/mongo-chord-repository'
import { CheckIfChordsExistsBySymbols, ICheckIfChordsExistsBySymbolsUsecase } from '../../../usecases/check-if-chords-exists-by-symbols-usecase'

export const makeCheckIfChordsExistsBySymbolsUsecase = (): ICheckIfChordsExistsBySymbolsUsecase => {
  const mongoChordRepository = new MongoChordRepository()
  const checkIfChordsExistsBySymbolsUsecase = new CheckIfChordsExistsBySymbols(mongoChordRepository)
  return checkIfChordsExistsBySymbolsUsecase
}
