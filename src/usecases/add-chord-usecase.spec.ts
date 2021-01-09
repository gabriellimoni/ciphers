import { Chord } from '../domain'
import { AddChordUsecase } from './add-chord-usecase'
import { AddChordModel } from './params/chord/add-chord-param'
import { AddChordRepository } from './protocols/chord'

interface SutTypes {
  sut: AddChordUsecase
  addChordRepositoryStub: AddChordRepository
}
const makeSut = (): SutTypes => {
  const addChordRepositoryStub = makeChordRepositoryStub()
  const sut = new AddChordUsecase(addChordRepositoryStub)
  return {
    sut,
    addChordRepositoryStub
  }
}

const makeChordRepositoryStub = (): AddChordRepository => {
  class ChordRepositoryStub implements AddChordRepository {
    async addChord (chordToAdd: AddChordModel): Promise<Chord> {
      return {
        id: 'any_id',
        symbol: 'any_symbol',
        imagesUrls: ['any_imageUrl']
      }
    }
  }
  return new ChordRepositoryStub()
}

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
})
