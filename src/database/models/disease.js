import { mongoose } from '../connection.js'

const Schema = mongoose.Schema

const diseaseSchema = new Schema(
  {
    chapter: { type: Number, min: 1, max: 12 },
    chapterName: { type: String },
    fourDigitsCode: { type: String, minLength: 4, maxLength: 4 },
    fourDigitsDescription: { type: String },
    threeDigitsCode: { type: String, minLength: 3, maxLength: 3 },
    threeDigitsDescription: { type: String },
    yearVersion: { type: String, match: /\b(1\d{3}|[2-9]\d{3})\b/ }
  },
  {
    timestamps: true
  }
)

export const Disease = mongoose.model('disease', diseaseSchema)
