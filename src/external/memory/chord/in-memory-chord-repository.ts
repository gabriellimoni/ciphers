import { Chord } from '../../../domain'
import { AddChordModel } from '../../../usecases/params/chord/add-chord-param'
import { AddChordRepository } from '../../../usecases/protocols/chord'

export const chords: Chord[] = []

export class InMemoryChordRepository implements AddChordRepository {
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
