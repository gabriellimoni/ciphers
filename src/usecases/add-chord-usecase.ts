import { ChordRepository } from './protocols/chord'
import { Usecase } from './protocols'
import { AddChordModel } from './params/chord/add-chord-param'
import { Chord } from '../domain'

export class AddChordUsecase implements Usecase<AddChordModel, Chord> {
  constructor (private readonly chordRepository: ChordRepository) {}

  async exec (chordToAdd: AddChordModel): Promise<Chord> {
    return await this.chordRepository.addChord(chordToAdd)
  }
}
