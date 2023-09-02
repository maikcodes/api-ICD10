import express from 'express'
import 'dotenv/config'
import v1DiseasesRouter from './v1/routes/disease.routes.js'

const app = express()

// settings
app.set('port', process.env.PORT ?? 4000)
app.set('test_url', process.env.TEST_URL)

// middleware
app.use(express.json())

// routes
app.use('/api/v1/diseases', v1DiseasesRouter)

// not found routes middleware
app.use((req, res, next) => {
  res.status(404).send({ status: 'FAILED', data: { error: 'Resource not found' } })
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Some error occurs ⚠⚠⚠', err.stack)
  res.status(500).send({ status: 'FAILED', data: { error: 'Internal server error' } })
})

export default app
