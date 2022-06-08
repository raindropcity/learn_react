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
  }
})

module.exports = mongoose.model('Recommend', recommendSchema)