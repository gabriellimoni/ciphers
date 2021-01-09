import { Chord } from '../../../domain'
import { AddChordModel } from '../../params/chord/add-chord-param'

export interface ChordRepository {
  addChord: (chord: AddChordModel) => Promise<Chord>
}
