import mongoose from 'mongoose'
import 'dotenv/config'

export const connectionState = async () => {
  try {
    const urlConnection = process.env.DB_CONNECTION_STRING
    console.log('🚀 ~ connectionState ~ urlConnection:', urlConnection)
    await mongoose.connect(urlConnection)
    console.log('Connection was stablish successfully 🆗')
  } catch (error) {
    console.log('Cannot connect ⚠', error)
    throw new Error('Failed to connect to database')
  }
}

export { mongoose }
