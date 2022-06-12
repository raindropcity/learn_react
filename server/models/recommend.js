const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recommendSchema = new Schema({
  bistroName: {
    type: String
  },
  bistroCategory: {
    type: String
  },
  bistroLocation: {
    type: String
  },
  bistroPhone: {
    type: String
  },
  googleMapURL: {
    type: String
  },
  bistroRating: {
    type: Number
  },
  description: {
    type: String
  },
  // 用於儲存二進位制(Buffer)的餐廳相片檔案
  bistroPicture: {
    type: Buffer
  }
})

module.exports = mongoose.model('Recommend', recommendSchema)