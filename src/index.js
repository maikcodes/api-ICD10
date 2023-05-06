import app from './app.js'
import { connectionState } from './database/connection.js'

const main = async () => {
  try {
    await connectionState()

    const port = app.get('port')
    app.listen(port)
    console.log(`ICD-10 API rocks 🚀, "http://localhost:${port}"`)
  } catch (error) {
    console.log('ICD-10 API start failed', error)
  }
}

main()
