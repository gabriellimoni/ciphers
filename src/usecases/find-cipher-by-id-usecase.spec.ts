import { Cipher } from '../domain'
import { FindCipherByIdUsecase } from './find-cipher-by-id-usecase'
import { FindCipherByIdRepository } from './protocols/cipher'

interface SutTypes {
  sut: FindCipherByIdUsecase
  findCipherByIdRepositoryStub: FindCipherByIdRepository
}
const makeSut = (): SutTypes => {
  const findCipherByIdRepositoryStub = makeFindCipherByIdRepositoryStub()
  const sut = new FindCipherByIdUsecase(findCipherByIdRepositoryStub)
  return {
    sut,
    findCipherByIdRepositoryStub
  }
}

const makeFindCipherByIdRepositoryStub = (): FindCipherByIdRepository => {
  class CipherRepositoryStub implements FindCipherByIdRepository {
    async findCipherById (cipherId: string): Promise<Cipher> {
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
  test('Should throws if FindCipherByIdRepository throws', async () => {
    const { sut, findCipherByIdRepositoryStub } = makeSut()
    jest.spyOn(findCipherByIdRepositoryStub, 'findCipherById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.exec('any_id')
    expect(promise).rejects.toThrow()
  })

  test('Should return cipher on success', async () => {
    const { sut } = makeSut()
    const cipher = await sut.exec('any_id')
    expect(cipher).toEqual(makeFakeCipher())
  })

  test('Should return null if cipher doesnt exists', async () => {
    const { sut, findCipherByIdRepositoryStub } = makeSut()
    jest.spyOn(findCipherByIdRepositoryStub, 'findCipherById').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const cipher = await sut.exec('any_id')
    expect(cipher).toBeNull()
  })
})
