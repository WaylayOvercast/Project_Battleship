const router = require('express').Router();
const Users = require('../auth/auth-model');
const Match = require('./core-model');
const { checkToken } = require('../middleware/auth-middle');


router.post('/gameOver', checkToken, async (req, res, next) => {
    try{
        const player = await Users.findBy('user', '*', `user_id, ${req.body.user_id}`)
        Match.endMatch(req.body.match_id)
        if(player){
            res.status(201).json({message:{}})
        }
    }catch(err){
        next(err)
    }
})

/* file subject to change, more endpoints to come and will handle core functionality (if RESTFUL and not socket related) */


module.exports = router;