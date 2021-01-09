import { Chord } from '../../../domain'

export interface FindChordBySymbolRepository {
  findBySymbol: (symbol: string) => Promise<Chord>
}
