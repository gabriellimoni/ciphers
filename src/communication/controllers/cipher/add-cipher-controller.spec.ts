import { AddCipherController } from './add-cipher-controller'
import { ICheckIfChordExistsBySymbolUsecase } from '../../../usecases/check-if-chord-exists-by-symbol-usecase'
import { badRequest } from '../../helpers/http'
import { RequiredParamError, InvalidParamError } from '../../errors'
import { Cipher } from '../../../domain'

interface SutTypes {
  sut: AddCipherController
  checkIfChordExistsBySymbolStub: ICheckIfChordExistsBySymbolUsecase
}

const makeSut = (): SutTypes => {
  const checkIfChordExistsBySymbolStub = makeCheckIfChordExistsBySymbolStub()
  const sut = new AddCipherController(checkIfChordExistsBySymbolStub)
  return {
    sut,
    checkIfChordExistsBySymbolStub
  }
}

const makeCheckIfChordExistsBySymbolStub = (): ICheckIfChordExistsBySymbolUsecase => {
  class CheckIfChordExistsBySymbolStub implements ICheckIfChordExistsBySymbolUsecase {
    async exec (symbols: string[]): Promise<boolean> {
      return false
    }
  }
  return new CheckIfChordExistsBySymbolStub()
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

  test('Should return 400 if CheckIfChordExistsBySymbols return true', async () => {
    const { sut, checkIfChordExistsBySymbolStub } = makeSut()
    jest.spyOn(checkIfChordExistsBySymbolStub, 'exec').mockReturnValueOnce(new Promise(resolve => resolve(true)))
    const response = await sut.handle({
      body: makeFakeCipher()
    })
    expect(response).toEqual(badRequest(new InvalidParamError('rows.word.character.chordSymbol')))
  })
})
