// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true},
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )

// CONFIGURATION
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an awesome App about Breads')
})

// breads
const breadsController = require('./controllers/breads_controllers')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})
