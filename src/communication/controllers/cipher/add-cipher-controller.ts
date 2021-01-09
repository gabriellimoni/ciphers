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
    for (const row of cipher.rows) {
      if (Object.keys(row).length === 0) return badRequest(new InvalidParamError('rows'))
      for (const word of row.words) {
        if (Object.keys(word).length === 0) return badRequest(new InvalidParamError('rows.word'))
        for (const character of word.characters) {
          if (Object.keys(character).length === 0) return badRequest(new InvalidParamError('rows.word.character'))
        }
      }
    }
    return null
  }
}
