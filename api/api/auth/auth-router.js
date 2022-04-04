const router = require('express').Router();
const{checkLogin, checkLogout, checkSubmission, checkToken} = require('../middleware/auth-middle')
const {BCRYPT_ROUNDS} = require('../../variableConfig')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')



router.put('/rtrauth', checkToken, (req, res, next)=> {
  try{
    const token = Users.createToken(req.body.user_id)
    console.log(`user with id: ${req.body.user_id} is refreshing tokens`)
    res.status(201).json({token:token})
  }catch(err){
    next(err)
  }
})

router.post('/register', checkSubmission, async (req, res, next) => {
  
  try{
      const { username, password, user_id } = req.body
      const newUser = {
        user_id,  
        username,
        password: bcrypt.hashSync(password.toString(), ~~BCRYPT_ROUNDS)   
      }
    const created = await Users.add(newUser, req.body.user_id);
    Users.setIsActive(created.user_id, true);
    const token = Users.createToken(req.body);
    res.status(201).json({username: created.username, user_id: created.user_id, token: token});
  }catch (err){
    next(err);
  }
});

router.put('/login', checkLogin, (req, res, next) => {
  try {
    console.log(req.body)
    Users.setIsActive(req.user.user_id, true);
    const token = Users.createToken(req.user);
    res.status(200).json({username: req.user.username, user_id: req.user.user_id, token: token});
  }catch (err){
    next(err);
  }
});

router.put('/logout', checkLogout, (req, res, next) => {
  try {
    Users.setIsActive(req.body.user_id, false);
    res.status(200).json({message: 'OK'});
  } catch (err) {
    next(err);
  }
});


module.exports = router;