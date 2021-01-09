import express from 'express'
import { adaptRoute } from './adapters/express/controllerAdapter'
import { makeAddChordController } from './factories/controllers/add-chord-controller-fac'
import { makeAddCipherController } from './factories/controllers/add-cipher-controller-fac'
import { makeFindChordBySymbolController } from './factories/controllers/find-chord-by-bymbol-controller-fac'

export const app = express()
const router = express.Router()

const addChordController = makeAddChordController()
const findChordBySymbolController = makeFindChordBySymbolController()

const addCipherController = makeAddCipherController()

// body-parser
app.use(express.json())

// Chord routes
router.post('/v1/chord', adaptRoute(addChordController))
router.get('/v1/chord/:symbol', adaptRoute(findChordBySymbolController))

// Cipher routes
router.post('/v1/cipher', adaptRoute(addCipherController))

app.use('/api', router)
