import { FindCipherByIdRepository } from './protocols/cipher'
import { Usecase } from './protocols'
import { Cipher } from '../domain'

export interface IFindCipherByIdUsecase extends Usecase<string, Cipher> {}
export class FindCipherByIdUsecase implements IFindCipherByIdUsecase {
  constructor (
    private readonly findCipherByIdRepository: FindCipherByIdRepository
  ) {}

  async exec (cipherId: string): Promise<Cipher> {
    return await this.findCipherByIdRepository.findCipherById(cipherId)
  }
}
