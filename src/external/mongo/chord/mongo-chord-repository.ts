import { Chord } from '../../../domain'
import { AddChordModel } from '../../../usecases/params/chord/add-chord-param'
import { AddChordRepository, FindChordBySymbolRepository } from '../../../usecases/protocols/chord'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoChordRepository implements AddChordRepository, FindChordBySymbolRepository {
  async addChord (chordToAdd: AddChordModel): Promise<Chord> {
    const chordCollection = await MongoHelper.getCollection('chords')
    const result = await chordCollection.insertOne(chordToAdd)
    return MongoHelper.map(result.ops[0])
  }

  async findBySymbol (symbol: string): Promise<Chord> {
    const chordCollection = await MongoHelper.getCollection('chords')
    const chord = await chordCollection.findOne({ symbol })
    return MongoHelper.map(chord)
  }
}
