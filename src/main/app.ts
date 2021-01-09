import express from 'express'
import { adaptRoute } from './adapters/express/controllerAdapter'
import { makeAddChordController } from './factories/controllers/addChordController'

export const app = express()
const router = express.Router()

const addChordController = makeAddChordController()

// body-parser
app.use(express.json())

// Chord routes
router.post('/v1/chord', adaptRoute(addChordController))

app.use('/api', router)
