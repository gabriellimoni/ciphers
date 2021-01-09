import { Chord } from '../domain'
import { CheckIfChordsExistsBySymbols } from './check-if-chords-exists-by-symbols-usecase'
import { FindChordsBySymbolsRepository } from './protocols/chord'

interface SutTypes {
  sut: CheckIfChordsExistsBySymbols
  findChordsBySymbolsStub: FindChordsBySymbolsRepository
}
const makeSut = (): SutTypes => {
  const findChordsBySymbolsStub = makeFindChordsBySymbolsRepositoryStub()
  const sut = new CheckIfChordsExistsBySymbols(findChordsBySymbolsStub)
  return {
    sut,
    findChordsBySymbolsStub
  }
}

const makeFindChordsBySymbolsRepositoryStub = (): FindChordsBySymbolsRepository => {
  class FindChordsBySymbolsRepositoryStub implements FindChordsBySymbolsRepository {
    async findBySymbols (symbols: string[]): Promise<Chord[]> {
      return [makeFakeChord()]
    }
  }
  return new FindChordsBySymbolsRepositoryStub()
}

const makeFakeChord = (): Chord => ({
  id: 'any_id',
  symbol: 'any_symbol',
  imagesUrls: ['any_imageUrl']
})

describe('AddChord Usecase', () => {
  test('Should throws if FindChordsBySymbolsRepository throws', async () => {
    const { sut, findChordsBySymbolsStub } = makeSut()
    jest.spyOn(findChordsBySymbolsStub, 'findBySymbols').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.exec(['any_symbol'])
    expect(promise).rejects.toThrow()
  })

  test('Should return false if FindChordsBySymbolsRepository returns empty array', async () => {
    const { sut, findChordsBySymbolsStub } = makeSut()
    jest.spyOn(findChordsBySymbolsStub, 'findBySymbols').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const response = await sut.exec(['any_symbol'])
    expect(response).toBe(false)
  })

  test('Should return true if FindChordsBySymbolsRepository returns one or more chord', async () => {
    const { sut } = makeSut()
    const response = await sut.exec(['any_symbol'])
    expect(response).toBe(true)
  })
})
