import express from 'express'
import { adaptRoute } from './adapters/express/controllerAdapter'
import { makeAddChordController } from './factories/controllers/addChordController'
import { makeFindChordBySymbolController } from './factories/controllers/findChordBySymbolController'

export const app = express()
const router = express.Router()

const addChordController = makeAddChordController()
const findChordBySymbolController = makeFindChordBySymbolController()

// body-parser
app.use(express.json())

// Chord routes
router.post('/v1/chord', adaptRoute(addChordController))
router.get('/v1/chord/:symbol', adaptRoute(findChordBySymbolController))

app.use('/api', router)
