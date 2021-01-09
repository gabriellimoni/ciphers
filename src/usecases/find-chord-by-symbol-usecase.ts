import { FindChordBySymbolRepository } from './protocols/chord'
import { Usecase } from './protocols'
import { Chord } from '../domain'

export interface IFindChordBySymbolUsecase extends Usecase<string, Chord> {}

export class FindChordBySymbol implements IFindChordBySymbolUsecase {
  constructor (
    private readonly findChordBySymbolRepository: FindChordBySymbolRepository
  ) {}

  async exec (symbol: string): Promise<Chord> {
    const chord = await this.findChordBySymbolRepository.findBySymbol(symbol)
    return chord
  }
}
