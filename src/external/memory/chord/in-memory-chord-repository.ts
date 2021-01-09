import { Chord } from '../../../domain'
import { AddChordModel } from '../../../usecases/params/chord/add-chord-param'
import { AddChordRepository, FindChordBySymbolRepository } from '../../../usecases/protocols/chord'

export const chords: Chord[] = []

export class InMemoryChordRepository implements AddChordRepository, FindChordBySymbolRepository {
  async findBySymbol (symbol: string): Promise<Chord> {
    const foundChord = chords.find(c => c.symbol === symbol)
    return foundChord
  }

  async addChord (chord: AddChordModel): Promise<Chord> {
    const newId = String(Date.now())
    const newChord: Chord = {
      id: newId,
      ...chord
    }
    chords.push(newChord)
    return newChord
  }
}
