import { MongoCipherRepository } from './mongo-cipher-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { Cipher } from '../../../domain'

const makeFakeCipher = (): Cipher => ({
  id: 'any_id',
  name: 'any_cipher',
  rows: [
    {
      words: [
        {
          characters: [
            {
              char: 'A',
              chordSymbol: 'D'
            }
          ]
        }
      ]
    }
  ]
})

describe('Mongo Cipher Repository', () => {
  let cipherCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    cipherCollection = await MongoHelper.getCollection('ciphers')
    await cipherCollection.deleteMany({})
  })

  describe('addCipher()', () => {
    test('Should insert 1 cipher in mongo', async () => {
      const mongoCipherRepo = new MongoCipherRepository()
      await mongoCipherRepo.addCipher(makeFakeCipher())
      const ciphers = await cipherCollection.find().toArray()
      expect(ciphers).toHaveLength(1)
      const cipher = ciphers[0]
      expect(cipher._id).toBeTruthy()
    })

    test('Should insert 1 cipher from mongo', async () => {
      const mongoCipherRepo = new MongoCipherRepository()
      const cipher = await mongoCipherRepo.addCipher(makeFakeCipher())
      expect(cipher.id).toBeTruthy()
      expect(cipher.rows).toBeTruthy()
    })
  })

  describe('findCipherById()', () => {
    test('Should return 1 cipher from mongo', async () => {
      const result = await cipherCollection.insertOne(makeFakeCipher())
      const mongoCipherRepo = new MongoCipherRepository()
      const findResult = await mongoCipherRepo.findCipherById(result.ops[0]._id)
      expect(findResult).toBeTruthy()
      expect(findResult).toMatchObject(expect.objectContaining({
        ...makeFakeCipher(),
        id: result.ops[0]._id
      }))
    })
  })
})
