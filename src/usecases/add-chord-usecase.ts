import { AddChordRepository, FindChordBySymbolRepository } from './protocols/chord'
import { Usecase } from './protocols'
import { AddChordModel } from './params/chord/add-chord-param'
import { Chord } from '../domain'

export interface IAddChordUsecase extends Usecase<AddChordModel, Chord> {}
export class AddChordUsecase implements IAddChordUsecase {
  constructor (
    private readonly addChordRepository: AddChordRepository,
    private readonly findChordBySymbolRepository: FindChordBySymbolRepository
  ) {}

  async exec (chordToAdd: AddChordModel): Promise<Chord> {
    const foundChord = await this.findChordBySymbolRepository.findBySymbol(chordToAdd.symbol)
    if (foundChord) return null
    return await this.addChordRepository.addChord(chordToAdd)
  }
}
