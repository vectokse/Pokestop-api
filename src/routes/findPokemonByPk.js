const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, async(req, res) => {
        try{
            const pokemon = await Pokemon.findByPk(req.params.id)
            if(pokemon === null){
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant'
                return res.status(404).json({message})
            }

            const message = 'Un pokémon a bien été trouvé.'
            res.json({ message, data: pokemon })
        }catch(error){
            console.log(error)
            const message = `Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        }
    })
}