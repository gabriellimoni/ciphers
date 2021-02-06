
import { Cipher } from '../../../domain'
import { IFindCipherByIdUsecase } from '../../../usecases/find-cipher-by-id-usecase'
import { FindCipherByIdController } from './find-cipher-by-id-controller'

interface SutTypes {
  sut: FindCipherByIdController
  findCipherByIdUsecase: IFindCipherByIdUsecase
}

const makeSut = (): SutTypes => {
  const findCipherByIdUsecase = makeFindCupherByIdUcStub()
  const sut = new FindCipherByIdController(findCipherByIdUsecase)
  return {
    sut,
    findCipherByIdUsecase
  }
}

const makeFindCupherByIdUcStub = (): IFindCipherByIdUsecase => {
  class FindCipherByIdUcStub implements IFindCipherByIdUsecase {
    async exec (cipherId: string): Promise<Cipher> {
      return makeFakeCipher()
    }
  }
  return new FindCipherByIdUcStub()
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

describe('FindCipherByIdController', () => {
  test('Should return 500 if FindCipherById throws', async () => {
    const { sut, findCipherByIdUsecase } = makeSut()
    jest.spyOn(findCipherByIdUsecase, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({
      params: {
        cipherId: 'any_id'
      }
    })
    expect(response.statusCode).toBe(500)
  })

  test('Should return 400 if params is not provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: undefined
    })
    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if param cipherId is not provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        anotherParam: ''
      }
    })
    expect(response.statusCode).toBe(400)
  })

  test('Should return 404 if findCipherByIdUsecase returns null', async () => {
    const { sut, findCipherByIdUsecase } = makeSut()
    jest.spyOn(findCipherByIdUsecase, 'exec').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const response = await sut.handle({
      params: {
        cipherId: 'any_id'
      }
    })
    expect(response.statusCode).toBe(404)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        cipherId: 'any_id'
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeFakeCipher())
  })
})
