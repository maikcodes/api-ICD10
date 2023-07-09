import express from 'express'
import 'dotenv/config'
import v1DiseasesRouter from './v1/routes/disease.routes.js'
import { sendErrorResponse } from './helpers/response.helpers.js'

const app = express()

// settings
app.set('port', process.env.SERVER_PORT || 4000)

// middleware
app.use(express.json())

// routes
app.use('/api/v1/diseases', v1DiseasesRouter)

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Some error occurs ⚠⚠⚠', err.stack)
  res.status(500).send(sendErrorResponse(res, err))
})

export default app
