const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
    app.post('/api/pokemons', async(req, res) => {
        try{
            const pokemon = await Pokemon.create(req.body)

            const message = `Le pokémon ${req.body.name} a bien été crée.`
            res.json({ message, data: pokemon })
        }catch(e){
            console.log(error)
            const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({ message, data:error })
        }
    })
}