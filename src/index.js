import app from './app.js'
import { Connection } from './database/connection.js'

const main = async () => {
  try {
    await Connection.connect()
    const port = app.get('port')
    app.listen(port)

    console.log(`ICD-10 API rocks 🚀, "http://localhost:${port}"`)
  } catch (error) {
    console.log('ICD-10 API start failed', error)
  }
}

main()
