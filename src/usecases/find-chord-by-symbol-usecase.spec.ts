import { Chord } from '../domain'
import { FindChordBySymbol } from './find-chord-by-symbol-usecase'
import { FindChordBySymbolRepository } from './protocols/chord'

interface SutTypes {
  sut: FindChordBySymbol
  findChordBySymbolRepositoryStub: FindChordBySymbolRepository
}
const makeSut = (): SutTypes => {
  const findChordBySymbolRepositoryStub = makeFindChordBySymbolRepositoryStub()
  const sut = new FindChordBySymbol(findChordBySymbolRepositoryStub)
  return {
    sut,
    findChordBySymbolRepositoryStub
  }
}

const makeFindChordBySymbolRepositoryStub = (): FindChordBySymbolRepository => {
  class FindChordBySymbolRepositoryStub implements FindChordBySymbolRepository {
    async findBySymbol (symbol: string): Promise<Chord> {
      return makeFakeChord()
    }
  }
  return new FindChordBySymbolRepositoryStub()
}

const makeFakeChord = (): Chord => ({
  id: 'any_id',
  symbol: 'any_symbol',
  imagesUrls: ['any_imageUrl']
})

describe('AddChord Usecase', () => {
  test('Should throws if FindChordBySymbolRepository throws', async () => {
    const { sut, findChordBySymbolRepositoryStub } = makeSut()
    jest.spyOn(findChordBySymbolRepositoryStub, 'findBySymbol').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.exec('any_symbol')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if FindChordBySymbolRepository returns null', async () => {
    const { sut, findChordBySymbolRepositoryStub } = makeSut()
    jest
      .spyOn(findChordBySymbolRepositoryStub, 'findBySymbol')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const chord = await sut.exec('any_symbol')
    expect(chord).toEqual(null)
  })

  test('Should return Chord on success', async () => {
    const { sut } = makeSut()
    const chord = await sut.exec('any_symbol')
    expect(chord).toEqual(makeFakeChord())
  })
})
