const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURL, { useNewUrlParser: true })
  .then(( )=> console.log('Db connected'))
  .catch(err => console.log(error))


app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())


app.use('/api/users', userRoutes)
app.use('/uploads', express.static('uploads'))

module.exports = app
