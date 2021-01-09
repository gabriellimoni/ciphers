import { Cipher } from '../../../domain'
import { AddCipherModel } from '../../params/chord/add-cipher-param'

export interface AddCipherRepository {
  addCipher: (chord: AddCipherModel) => Promise<Cipher>
}
