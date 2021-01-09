import { HttpResponse } from '../protocols'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    message: error.message
  }
})
