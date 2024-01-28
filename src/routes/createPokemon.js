const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        const pokemonCreated = req.body
        Pokemon.create({
            name: pokemonCreated.name,
            hp: pokemonCreated.hp,
            cp: pokemonCreated.cp,
            picture: pokemonCreated.picture,
            types: pokemonCreated.types.join()
        })
        .then(pokemon => {
            const message = `Le pokémon ${req.body.name} a bien été crée.`
            res.json({ message, data: pokemon })
        })
    })
}