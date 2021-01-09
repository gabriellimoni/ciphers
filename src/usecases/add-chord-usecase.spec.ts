import { Chord } from '../domain'
import { AddChordUsecase } from './add-chord-usecase'
import { AddChordModel } from './params/chord/add-chord-param'
import { AddChordRepository, FindChordBySymbolRepository } from './protocols/chord'

interface SutTypes {
  sut: AddChordUsecase
  addChordRepositoryStub: AddChordRepository
  findChordBySymbolRepositoryStub: FindChordBySymbolRepository
}
const makeSut = (): SutTypes => {
  const addChordRepositoryStub = makeAddChordRepositoryStub()
  const findChordBySymbolRepositoryStub = makeFindChordBySymbolRepositoryStub()
  const sut = new AddChordUsecase(addChordRepositoryStub, findChordBySymbolRepositoryStub)
  return {
    sut,
    addChordRepositoryStub,
    findChordBySymbolRepositoryStub
  }
}

const makeAddChordRepositoryStub = (): AddChordRepository => {
  class ChordRepositoryStub implements AddChordRepository {
    async addChord (chordToAdd: AddChordModel): Promise<Chord> {
      return makeFakeChord()
    }
  }
  return new ChordRepositoryStub()
}

const makeFindChordBySymbolRepositoryStub = (): FindChordBySymbolRepository => {
  class FindChordBySymbolRepositoryStub implements FindChordBySymbolRepository {
    async findBySymbol (symbol: string): Promise<Chord> {
      return null
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
  test('Should throws if AddChordRepository throws', async () => {
    const { sut, addChordRepositoryStub } = makeSut()
    jest.spyOn(addChordRepositoryStub, 'addChord').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.exec({
      imagesUrls: ['any_imageUrl'],
      symbol: 'any_symbol'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should return null if FindChordBySymbolRepository returns a chord', async () => {
    const { sut, findChordBySymbolRepositoryStub } = makeSut()
    jest
      .spyOn(findChordBySymbolRepositoryStub, 'findBySymbol')
      .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeChord())))
    const chord = await sut.exec({
      imagesUrls: ['any_imageUrl'],
      symbol: 'any_symbol'
    })
    expect(chord).toBeNull()
  })
})
