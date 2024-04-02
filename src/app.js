import express, { Router } from 'express'
import 'dotenv/config'

import { registerRoutes, registerDocRoutes } from './v1/routes/register.js'

const router = Router()
const docRouter = Router()
registerRoutes(router)
registerDocRoutes(docRouter)

const app = express()

// settings
app.set('port', process.env.PORT ?? 4000)
app.set('test_url', process.env.TEST_URL)

// middleware
app.use(express.json())

// routes
app.use('/api/v1/diseases', router)
app.use('/api-docs', docRouter)

// not found routes middleware
app.use((req, res, next) => {
  res
    .status(404)
    .send({ status: 'FAILED', data: { error: 'Resource not found' } })
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Some error occurs ⚠⚠⚠', err.stack)
  res
    .status(500)
    .send({ status: 'FAILED', data: { error: 'Internal server error' } })
})

export default app
