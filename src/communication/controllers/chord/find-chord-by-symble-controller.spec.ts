import { Chord } from '../../../domain'
import { IFindChordBySymbolUsecase } from '../../../usecases/find-chord-by-symbol-usecase'
import { RequiredParamError } from '../../errors'
import { badRequest } from '../../helpers/http'
import { FindChordBySymbolController } from './find-chord-by-symbol-controller'

interface SutTypes {
  sut: FindChordBySymbolController
  findChordBySymbleRepositoryStub: IFindChordBySymbolUsecase
}

const makeSut = (): SutTypes => {
  const findChordBySymbleRepositoryStub = makeFindChordBySymbleRepositoryStub()
  const sut = new FindChordBySymbolController(findChordBySymbleRepositoryStub)
  return {
    sut,
    findChordBySymbleRepositoryStub
  }
}

const makeFindChordBySymbleRepositoryStub = (): IFindChordBySymbolUsecase => {
  class FindChordBySymbleRepositoryStub implements IFindChordBySymbolUsecase {
    async exec (symbol: string): Promise<Chord> {
      return {
        id: 'any_id',
        symbol: 'any_symbol',
        imagesUrls: ['any_iamges_urls']
      }
    }
  }
  return new FindChordBySymbleRepositoryStub()
}

describe('FindChordBySymbol Controller', () => {
  test('Should return 500 if FindChordBySymbol throws', async () => {
    const { sut, findChordBySymbleRepositoryStub } = makeSut()
    jest.spyOn(findChordBySymbleRepositoryStub, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({
      params: {
        symbol: 'any_symbol'
      }
    })
    expect(response.statusCode).toBe(500)
  })

  test('Should return 400 if symbol is not provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {}
    })
    expect(response).toEqual(badRequest(new RequiredParamError('symbol')))
  })
})
