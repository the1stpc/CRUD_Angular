const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  birthday: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  mailing: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('users', userSchema)