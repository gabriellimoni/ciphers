import { AddCipherController } from './add-cipher-controller'
import { ICheckIfChordsExistsBySymbolsUsecase } from '../../../usecases/check-if-chords-exists-by-symbols-usecase'
import { IAddCipherUsecase } from '../../../usecases/add-cipher-usecase'
import { badRequest } from '../../helpers/http'
import { RequiredParamError, InvalidParamError } from '../../errors'
import { Cipher } from '../../../domain'
import { AddCipherModel } from '../../../usecases/params/cipher/add-cipher-param'

interface SutTypes {
  sut: AddCipherController
  checkIfChordExistsBySymbolStubs: ICheckIfChordsExistsBySymbolsUsecase
  addCipherStub: IAddCipherUsecase
}

const makeSut = (): SutTypes => {
  const checkIfChordExistsBySymbolStubs = makeCheckIfChordExistsBySymbolStub()
  const addCipherStub = makeAddCipherStub()
  const sut = new AddCipherController(checkIfChordExistsBySymbolStubs, addCipherStub)
  return {
    sut,
    checkIfChordExistsBySymbolStubs,
    addCipherStub
  }
}

const makeCheckIfChordExistsBySymbolStub = (): ICheckIfChordsExistsBySymbolsUsecase => {
  class CheckIfChordExistsBySymbolStub implements ICheckIfChordsExistsBySymbolsUsecase {
    async exec (symbols: string[]): Promise<boolean> {
      return true
    }
  }
  return new CheckIfChordExistsBySymbolStub()
}

const makeAddCipherStub = (): IAddCipherUsecase => {
  class AddCipherStub implements IAddCipherUsecase {
    async exec (cipherToAdd: AddCipherModel): Promise<Cipher> {
      return makeFakeCipher()
    }
  }
  return new AddCipherStub()
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

describe('AddCipher Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const cipherWithNoName = makeFakeCipher()
    delete cipherWithNoName.name
    const response = await sut.handle({
      body: cipherWithNoName
    })
    expect(response).toEqual(badRequest(new RequiredParamError('name')))
  })

  test('Should return 400 if no rows is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        name: 'any_name'
      }
    })
    expect(response).toEqual(badRequest(new RequiredParamError('rows')))
  })

  test('Should return 400 if any row is empty', async () => {
    const { sut } = makeSut()

    const cipherWithEmptyRow: any = makeFakeCipher()
    cipherWithEmptyRow.rows.push({})

    const response = await sut.handle({
      body: cipherWithEmptyRow
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows')))
  })

  test('Should return 400 if any word is empty', async () => {
    const { sut } = makeSut()

    const cipherWithEmptyWord: any = makeFakeCipher()
    cipherWithEmptyWord.rows[0].words.push({})

    const response = await sut.handle({
      body: cipherWithEmptyWord
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word')))
  })

  test('Should return 400 if any character is empty', async () => {
    const { sut } = makeSut()

    const cipherWithEmptyCharacter: any = makeFakeCipher()
    cipherWithEmptyCharacter.rows[0].words[0].characters.push({})

    const response = await sut.handle({
      body: cipherWithEmptyCharacter
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word.character')))
  })

  test('Should return 400 if any row does not have property "words"', async () => {
    const { sut } = makeSut()

    const cipherWithNoPropertyRow: any = makeFakeCipher()
    cipherWithNoPropertyRow.rows.push({ otherProp: '' })

    const response = await sut.handle({
      body: cipherWithNoPropertyRow
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows')))
  })

  test('Should return 400 if any word does not have property "characters"', async () => {
    const { sut } = makeSut()

    const cipherWithNoPropertyWord: any = makeFakeCipher()
    cipherWithNoPropertyWord.rows[0].words.push({ otherProp: '' })

    const response = await sut.handle({
      body: cipherWithNoPropertyWord
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word')))
  })

  test('Should return 400 if any character does not have property "char"', async () => {
    const { sut } = makeSut()

    const cipherWithNoPropertyCharacter: any = makeFakeCipher()
    cipherWithNoPropertyCharacter.rows[0].words[0].characters.push({ otherPropr: '' })

    const response = await sut.handle({
      body: cipherWithNoPropertyCharacter
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word.character')))
  })

  test('Should return 400 if CheckIfChordExistsBySymbols return false', async () => {
    const { sut, checkIfChordExistsBySymbolStubs } = makeSut()
    jest.spyOn(checkIfChordExistsBySymbolStubs, 'exec').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const response = await sut.handle({
      body: makeFakeCipher()
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word.character.chordSymbol')))
  })

  test('Should return 500 if CheckIfChordExistsBySymbols throws', async () => {
    const { sut, checkIfChordExistsBySymbolStubs } = makeSut()
    jest.spyOn(checkIfChordExistsBySymbolStubs, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({
      body: makeFakeCipher()
    })
    expect(response.statusCode).toBe(500)
  })

  test('Should return 500 if AddCipherUsecase throws', async () => {
    const { sut, addCipherStub } = makeSut()
    jest.spyOn(addCipherStub, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({
      body: makeFakeCipher()
    })
    expect(response.statusCode).toBe(500)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: makeFakeCipher()
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeTruthy()
    expect(response.body.rows).toBeFalsy()
  })

  test('Should not call CheckIfChordExistsBySymbols if no chordSymbols exists', async () => {
    const { sut, checkIfChordExistsBySymbolStubs } = makeSut()
    const execSpy = jest.spyOn(checkIfChordExistsBySymbolStubs, 'exec')
    const cipherWithoutChords: any = makeFakeCipher()
    cipherWithoutChords.rows[0].words[0].characters[0].chordSymbol = undefined
    await sut.handle({
      body: cipherWithoutChords
    })
    expect(execSpy).toHaveBeenCalledTimes(0)
  })
})
