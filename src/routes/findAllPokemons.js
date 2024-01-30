const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.get('/api/pokemons', auth, async(req, res) => {
        try{
            const pokemons = await Pokemon.findAll()

            const message = 'La liste des pokémons a bien été récupéré.'
            res.json({ message, data: pokemons })
        }catch(error){
            console.log(error)
            const message = `La liste des pokémons n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        }
    })
}