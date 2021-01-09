import { Cipher } from '../../../domain'
import { AddCipherModel } from '../../../usecases/params/cipher/add-cipher-param'
import { AddCipherRepository } from '../../../usecases/protocols/cipher/add-cipher-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoCipherRepository implements AddCipherRepository {
  async addCipher (cipherToAdd: AddCipherModel): Promise<Cipher> {
    const cipherCollection = await MongoHelper.getCollection('ciphers')
    const result = await cipherCollection.insertOne(cipherToAdd)
    return MongoHelper.map(result.ops[0])
  }
}
