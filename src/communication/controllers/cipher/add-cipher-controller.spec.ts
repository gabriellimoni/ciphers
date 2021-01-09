import { AddCipherController } from './add-cipher-controller'
import { badRequest } from '../../helpers/http'
import { RequiredParamError, InvalidParamError } from '../../errors'
import { Cipher } from '../../../domain'

interface SutTypes {
  sut: AddCipherController
}

const makeSut = (): SutTypes => {
  const sut = new AddCipherController()
  return {
    sut
  }
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
              chordId: '0as0a90s9a0s90a9s09a'
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
})
