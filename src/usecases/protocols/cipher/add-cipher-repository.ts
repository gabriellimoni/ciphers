import { Cipher } from '../../../domain'
import { AddCipherModel } from '../../params/cipher/add-cipher-param'

export interface AddCipherRepository {
  addCipher: (chord: AddCipherModel) => Promise<Cipher>
}
