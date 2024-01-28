const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
let pokemons = require('./src/db/mock-pokemon.js');
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan('dev'))
app.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => res.send('Hello, Express! 👋'))

require('./src/routes/findAllPokemons.js')(app)

require('./src/routes/findPokemonByPk.js')(app)

require('./src/routes/createPokemon.js')(app)

require('./src/routes/updatePokemon.js')(app)

require('./src/routes/deletePokemon.js')(app)

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))