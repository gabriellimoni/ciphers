import { Cipher } from '../../../domain'

export interface FindCipherByIdRepository {
  findCipherById: (id: string) => Promise<Cipher>
}
