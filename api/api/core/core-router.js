const router = require('express').Router();
const Users = require('../auth/auth-model')
const Match = require('./core-model')


router.get('/findOnline', async (req, res, next) => {
    try{
        const players = await Users.findOthers(req.body.user_id);        
        if(players){
            res.status(200).json({message:{...players}})
        }
    }catch(err){
        next(err)              // all endpoints need middleware and additional checks
    }
})

router.post('/invite', async (req, res, next) => {
    try{
        const challenger = await Users.findById(req.body.user_id)
        const defender = await Users.findById(req.body.defender_id)
        
        if(challenger && defender){
            const invite = await Match.inviteUser(challenger.user_id, defender.user_id)
            res.status(201).json({message:{...invite}})
        }
    }catch(err){
        next(err)
    }
})

router.get('/invite', async (req, res, next) => {
    try{
        //const check = await Match.checkIfInvites(req.body.user_id)
        if(check){
            res.status(200).json({message:{check}})
        }
    }catch(err){
        next(err)
    }
})

router.post('/inviteReply', async (req, res, next) => {
    try{
        const response = await Match.replyToInvite(req.body.bool, req.body.invite_id)
        if(response){
            res.status(201).json({message:{response}})
        }
    }catch(err){
        next(err)
    }
})

router.post('/gameOver',async (req, res, next) => {
    try{
        const player = await Users.findBy({user_id: req.body.user_id})
        Match.endMatch(req.body.match_id)
        if(player){
            res.status(201).json({message:{}})
        }
    }catch(err){
        next(err)
    }
})




module.exports = router;