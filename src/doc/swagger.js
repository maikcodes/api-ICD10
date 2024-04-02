import { apiInfo } from './apiInfo.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export function apiDocSetup (endpoints) {
  console.log('🚀 ~ apiDocSetup ~ endpoints:', endpoints)
  const swaggerDefinition = {
    openapi: '3.0.3',
    info: apiInfo,
    servers: [
      {
        url: 'http://localhost:4000'
      }
    ]
  }

  const docs = swaggerJSDoc({
    swaggerDefinition,
    apis: endpoints
  })

  return {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(docs)
  }
}
