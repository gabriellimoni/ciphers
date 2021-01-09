import { Usecase } from './protocols'
import { FindChordsBySymbolsRepository } from './protocols/chord'

export interface ICheckIfChordsExistsBySymbolsUsecase extends Usecase<string[], boolean> {}

export class CheckIfChordsExistsBySymbols implements ICheckIfChordsExistsBySymbolsUsecase {
  constructor (
    private readonly findChordsBySymbols: FindChordsBySymbolsRepository
  ) {}

  async exec (symbols: string[]): Promise<boolean> {
    const chords = await this.findChordsBySymbols.findBySymbols(symbols)
    return Boolean(chords.length)
  }
}
