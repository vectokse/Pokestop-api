const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
    app.delete('/api/pokemons/:id', async(req, res) => {
        try{
            const pokemonDeleted =  await Pokemon.findByPk(req.params.id)
            if(pokemonDeleted === null){
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant'
                return res.status(404).json({message})
            }

            await Pokemon.destroy({
                where: { id: pokemonDeleted.id }
            })
            
            const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
            res.json({message, data: pokemonDeleted })
        }catch(error){
            console.log(error)
            const message = `Le pokémon avec l'identifiant n°${req.params.id} n'a pas pu être supprimé.`
            res.status(500).json({ message, data: error })
        }
    })
}