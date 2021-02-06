import { Cipher } from '../../../domain'
import { AddCipherModel } from '../../../usecases/params/cipher/add-cipher-param'
import { AddCipherRepository } from '../../../usecases/protocols/cipher/add-cipher-repository'
import { FindCipherByIdRepository } from '../../../usecases/protocols/cipher/find-cipher-by-id-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class MongoCipherRepository implements AddCipherRepository, FindCipherByIdRepository {
  async addCipher (cipherToAdd: AddCipherModel): Promise<Cipher> {
    const cipherCollection = await MongoHelper.getCollection('ciphers')
    const result = await cipherCollection.insertOne(cipherToAdd)
    return MongoHelper.map(result.ops[0])
  }

  async findCipherById (id: string): Promise<Cipher> {
    const cipherCollection = await MongoHelper.getCollection('ciphers')
    const result = await cipherCollection.findOne({ _id: new ObjectId(id) })
    if (!result) return null
    return MongoHelper.map(result)
  }
}
