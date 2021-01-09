import { Chord } from '../../../domain'
import { AddChordModel } from '../../params/chord/add-chord-param'

export interface AddChordRepository {
  addChord: (chord: AddChordModel) => Promise<Chord>
}
