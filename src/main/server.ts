import { app } from './app'
import env from './config/env'
import { MongoHelper } from '../external/mongo/helpers/mongo-helper'

MongoHelper.connect(env.MONGO_URL).then(() => {
  app.listen(3000, () => console.log('App listening at 3000'))
}).catch(err => {
  console.log('ERROR INITIALIZING MONGODB')
  console.error(err)
})
