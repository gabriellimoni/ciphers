import { MongoChordRepository } from './mongo-chord-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

describe('Mongo Chord Repository', () => {
  let chordCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    chordCollection = await MongoHelper.getCollection('chords')
    await chordCollection.deleteMany({})
  })

  describe('addChord()', () => {
    test('Should insert 1 chord in mongo', async () => {
      const mongoChordRepo = new MongoChordRepository()
      await mongoChordRepo.addChord({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      const chords = await chordCollection.find().toArray()
      expect(chords).toHaveLength(1)
      const chord = chords[0]
      expect(chord._id).toBeTruthy()
      expect(chord.symbol).toBe('Any Symbol')
      expect(chord.imagesUrls).toEqual(['any_image_urls'])
    })

    test('Should return 1 Chord from repository', async () => {
      const mongoChordRepo = new MongoChordRepository()
      const chord = await mongoChordRepo.addChord({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      expect(chord.id).toBeTruthy()
      expect(chord.symbol).toBe('Any Symbol')
      expect(chord.imagesUrls).toEqual(['any_image_urls'])
    })
  })

  describe('findChordBySymbol()', () => {
    test('Should retrieve 1 chord from mongo', async () => {
      await chordCollection.insertOne({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      const mongoChordRepo = new MongoChordRepository()
      const chord = await mongoChordRepo.findBySymbol('Any Symbol')
      expect(chord.id).toBeTruthy()
      expect(chord.symbol).toBe('Any Symbol')
      expect(chord.imagesUrls).toEqual(['any_image_urls'])
    })
  })

  describe('findBySymbols()', () => {
    test('Should retrieve 2 chords from mongo', async () => {
      await chordCollection.insertOne({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      await chordCollection.insertOne({
        symbol: 'Any Symbol 2',
        imagesUrls: ['any_image_urls', 'any_image_urls_2']
      })
      const mongoChordRepo = new MongoChordRepository()
      const chords = await mongoChordRepo.findBySymbols(['Any Symbol', 'Any Symbol 2'])
      expect(chords.length).toBe(2)
    })
  })
})
