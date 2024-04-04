import mongoose from 'mongoose'
import 'dotenv/config'

export class Connection {
  static async connect () {
    try {
      const urlConnection = process.env.DB_CONNECTION_STRING
      await mongoose.connect(urlConnection)
      console.log('Connection was stablish successfully')
    } catch (error) {
      console.log('Cannot connect', error)
      throw new Error('Failed to connect to database')
    }
  }

  static async isConnected () {
    /**
     * Possible values for mongoose.connection.readyState
     * 0: disconnected
     * 1: connected
     * 2: connecting
     * 3: disconnecting
     * see: https://mongoosejs.com/docs/api/connection.html#Connection.prototype.readyState
     */
    return mongoose.connection.readyState === 1
  }

  static async close () {
    try {
      await mongoose.connection.close()
      console.log('Connection was closed successfully')
    } catch (error) {
      console.log('Cannot close connection', error)
      throw new Error('Failed to close connection to database')
    }
  }
}

export { mongoose }
