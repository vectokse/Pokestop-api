const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {Sequelize} = require('sequelize')
const {success , getUniqueId} = require('./helper')
let pokemons = require('./mock-pokemon') 

const app = express()
const port = 3000

const sequelize = new Sequelize(
   'Pokestop',
   'root',
   '',
   {
    host : 'localhost',
    dialect : 'mariadb',
    dialectOptions: {
        timezone : 'Etc/GMT-2'
    },
    logging: false
   } 
)

sequelize.authenticate()
   .then(_ => console.log('La connexion à la base de données a bien été etablie.'))
   .catch(error => console.log(`Imposible de se connecter à la base de données ${error}`))


app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req,res) => res.send('Hello , Express!'))

app.get('/api/pokemons', (req,res) => {
    const message = "La liste des pokémons a bien été récupérée."
    res.json(success(message,pokemons))
})

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id ===id)
    const message = "Un pokémon a bien été trouvé."
    res.json(success(message,pokemon))
})

app.post('/api/pokemons/', (req,res) => {
    const id = getUniqueId(pokemons)
    const newPokemon =  {...req.body , ... {id:id , created: new Date()}}
    pokemons.push(newPokemon)
    const message = `le pokemon ${newPokemon.name} a bien été crée`
    res.json(success(message,newPokemon))
})

app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id:id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id=== id ? pokemonUpdated : pokemon
    })
    const message = `le pokemon ${pokemonUpdated.name} a bien été modifié`
    res.json(success(message,pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    console.log(id)
    console.log(pokemonDeleted)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    console.log(pokemons)
    const message = `le pokemon ${pokemonDeleted.name} a bien été supprimé`
    res.json(success(message,pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))