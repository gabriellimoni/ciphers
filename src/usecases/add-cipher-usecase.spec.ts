import { Cipher } from '../domain'
import { AddCipherUsecase } from './add-cipher-usecase'
import { AddCipherModel } from './params/chord/add-cipher-param'
import { AddCipherRepository } from './protocols/chord'

interface SutTypes {
  sut: AddCipherUsecase
  addCipherRepositoryStub: AddCipherRepository
}
const makeSut = (): SutTypes => {
  const addCipherRepositoryStub = makeAddCipherRepositoryStub()
  const sut = new AddCipherUsecase(addCipherRepositoryStub)
  return {
    sut,
    addCipherRepositoryStub
  }
}

const makeAddCipherRepositoryStub = (): AddCipherRepository => {
  class CipherRepositoryStub implements AddCipherRepository {
    async addCipher (chordToAdd: AddCipherModel): Promise<Cipher> {
      return makeFakeCipher()
    }
  }
  return new CipherRepositoryStub()
}

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

describe('AddCipher Usecase', () => {
  test('Should throws if AddCipherRepository throws', async () => {
    const { sut, addCipherRepositoryStub } = makeSut()
    jest.spyOn(addCipherRepositoryStub, 'addCipher').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.exec(makeFakeCipher())
    expect(promise).rejects.toThrow()
  })

  test('Should return on success', async () => {
    const { sut } = makeSut()
    const chord = await sut.exec(makeFakeCipher())
    expect(chord).toEqual(makeFakeCipher())
  })
})
