var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../webpack.config')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/results', (req, res) => {
  const { page, resultsPerPage } = req.query
  res.json(getFakeResults(page, resultsPerPage))
})

// Fake Database
function getFakeResults(page, resultsPerPage) {

  // Since it's a fake database, resultsPerPage is insignificant to the code

  const database = [
    { id: 1, name:'Brad' },
    { id: 2, name:'Jess' },
    { id: 3, name:'Jean' },
    { id: 4, name:'Kevin' },
    { id: 5, name:'Joe' },
    { id: 6, name:'Dhruv' }
  ]

  const response = { totalResults: database.length }

  switch(parseInt(page)) {
    case 1: response.results = database.slice(0, 2); break;
    case 2: response.results = database.slice(2, 4); break;
    case 3: response.results = database.slice(4, 6); break;
    default: throw new Error('Invalid page. Only use 1, 2, or 3')
  }

  return response

}

app.listen(3030, 'localhost', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:3030\nWaiting for build...')
})
