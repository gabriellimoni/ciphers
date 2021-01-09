import { Chord } from '../../../domain'

export interface FindChordsBySymbolsRepository {
  findBySymbols: (symbols: string[]) => Promise<Chord[]>
}
