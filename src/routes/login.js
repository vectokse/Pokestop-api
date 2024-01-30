const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../db/sequelize')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login/', async(req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    username : req.body.username
                }
            })
            if(!user){
                const message = `l'utilisateur demandé n'existe pas.`
                return res.status(404).json({message:message})
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordValid){
                const message = `le mot de passe est incorrect.`
                return res.status(401).json({message:message})
            }

            const token = jwt.sign(
                {userId: user.id},
                privateKey,
                {expiresIn: '24h'}
            )

            const message = `l'utilisateur a été connecté avec succès.`
            return res.json({message:message,data : user,token: token})
        }catch(error){
            console.log(error)
            const message = `l'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        }
    })
}