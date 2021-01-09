import { AddCipherRepository } from './protocols/chord'
import { Usecase } from './protocols'
import { AddCipherModel } from './params/cipher/add-cipher-param'
import { Cipher } from '../domain'

export interface IAddCipherUsecase extends Usecase<AddCipherModel, Cipher> {}
export class AddCipherUsecase implements IAddCipherUsecase {
  constructor (
    private readonly addCipherRepository: AddCipherRepository
  ) {}

  async exec (cipherToAdd: AddCipherModel): Promise<Cipher> {
    return await this.addCipherRepository.addCipher(cipherToAdd)
  }
}
