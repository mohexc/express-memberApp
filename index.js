const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')
const app = express()

//? handlebars meddleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//? Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? homepage route
app.get('/', (req, res) => res.render('index', { title: 'Member App', members }))

//? init middleware
app.use(logger)

// //? Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//?members APi routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))