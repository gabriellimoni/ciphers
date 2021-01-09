import { Chord } from '../../../domain'
import { IAddChordUsecase } from '../../../usecases/add-chord-usecase'
import { AddChordModel } from '../../../usecases/params/chord/add-chord-param'
import { AddChordController } from './add-chord-controller'

interface SutTypes {
  sut: AddChordController
  addChordUsecaseStub: IAddChordUsecase
}

const makeSut = (): SutTypes => {
  const addChordUsecaseStub = makeAddChordUsecaseStub()
  const sut = new AddChordController(addChordUsecaseStub)
  return {
    sut,
    addChordUsecaseStub
  }
}

const makeAddChordUsecaseStub = (): IAddChordUsecase => {
  class AddChordUsecaseStub implements IAddChordUsecase {
    async exec (addChordModel: AddChordModel): Promise<Chord> {
      return {
        id: 'any_id',
        symbol: 'any_symbol',
        imagesUrls: ['any_iamges_urls']
      }
    }
  }
  return new AddChordUsecaseStub()
}

describe('AddChord Controller', () => {
  test('Shoudl return 500 if AddChordUsecase throws', async () => {
    const { sut, addChordUsecaseStub } = makeSut()
    jest.spyOn(addChordUsecaseStub, 'exec').mockRejectedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(500)
  })
})
