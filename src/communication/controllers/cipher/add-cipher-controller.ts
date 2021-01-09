import { Cipher } from '../../../domain'
import { InvalidParamError, RequiredParamError } from '../../errors'
import { badRequest } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddCipherController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'rows']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new RequiredParamError(field))
    }

    const cipher: Cipher = httpRequest.body
    // this may take a while...
    const rowError = checkForRowErrors(cipher)
    if (rowError) return badRequest(rowError)
    const wordError = checkForWordErrors(cipher)
    if (wordError) return badRequest(wordError)
    const charError = checkForCharacterErrors(cipher)
    if (charError) return badRequest(charError)

    return null
  }
}

function checkForRowErrors (cipher: Cipher): Error | undefined {
  for (const row of cipher.rows) {
    if (Object.keys(row).length === 0) return new InvalidParamError('rows')
    if (!Object.keys(row).includes('words')) return new InvalidParamError('rows')
  }
}

function checkForWordErrors (cipher: Cipher): Error | undefined {
  for (const row of cipher.rows) {
    for (const word of row.words) {
      if (Object.keys(word).length === 0) return new InvalidParamError('rows.word')
      if (!Object.keys(word).includes('characters')) return new InvalidParamError('rows.word')
    }
  }
}

function checkForCharacterErrors (cipher: Cipher): Error | undefined {
  for (const row of cipher.rows) {
    for (const word of row.words) {
      for (const character of word.characters) {
        if (Object.keys(character).length === 0) return new InvalidParamError('rows.word.character')
        if (!Object.keys(word).includes('char')) return new InvalidParamError('rows.word.character')
      }
    }
  }
}
