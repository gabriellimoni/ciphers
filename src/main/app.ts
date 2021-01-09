import express from 'express'
import { adaptRoute } from './adapters/express/controllerAdapter'
import { makeAddChordController } from './factories/controllers/addChordController'

export const app = express()

const addChordController = makeAddChordController()
app.use(express.json())

app.post('/chord', adaptRoute(addChordController))
