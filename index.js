const express = require('express')
const path = require('path')
const momet = require('moment')
const members = require('./Members')

const app = express()

// app.get('/', (req, res) => {
// res.send('<h1>Hello ExpressJs</h1>')
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.git('host')}${res.originalUrl}`)
  next()
}

//? init middleware
app.use(logger)

//? Get All members
app.get('/api/members', (req, res) => res.json(members))

// //? Set static folder
// app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))