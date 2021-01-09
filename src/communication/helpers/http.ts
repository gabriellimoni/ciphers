import { HttpResponse } from '../protocols'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
