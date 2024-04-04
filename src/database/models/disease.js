import { mongoose } from '../connection.js'

const Schema = mongoose.Schema

const diseaseSchema = new Schema(
  {
    chapter_id: { type: String, minLength: 1, maxLength: 5 },
    chapter_title: { type: String },
    range_id: { type: String },
    range_title: { type: String },
    sub_range_id: { type: String },
    sub_range_title: { type: String },
    specific_sub_range_id: { type: String },
    specific_sub_range_title: { type: String },
    four_code_id: { type: String, length: 5 },
    four_code_title: { type: String },
    three_code_id: { type: String, length: 3 },
    three_code_title: { type: String }
    // yearVersion: { type: String, match: /\b(1\d{3}|[2-9]\d{3})\b/ }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const Disease = mongoose.model('disease', diseaseSchema)
