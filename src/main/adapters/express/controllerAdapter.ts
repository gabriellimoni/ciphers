import { Request, Response } from 'express'
import { Controller } from '../../../communication/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req)
    console.log(httpResponse.body)
    if (httpResponse.statusCode === 200) {
      return res.status(200).json(httpResponse.body)
    } else if (httpResponse.statusCode >= 400) {
      if (httpResponse.body instanceof Error) {
        return res.status(httpResponse.statusCode).json({
          message: httpResponse.body.message
        })
      }
    } else res.status(500).send('Internal server error')
  }
}
