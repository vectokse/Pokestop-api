const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, async(req, res) => {
        const id = req.params.id
        try{
            const results = await Pokemon.update(req.body, {
                where: { id: id }
            })
            if(results[0] === null){
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant'
                return res.status(404).json({message})
            }

            const pokemonUpdated = await Pokemon.findByPk(id)

            const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
            res.json({message, data: pokemonUpdated })
        }catch(e){
            console.log(error)
            const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        }
    })
}