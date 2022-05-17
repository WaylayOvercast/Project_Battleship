const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../variableConfig')
const bcrypt = require('bcryptjs')


/* file is subject to changes namely functional optimization and DRY rewrites */

async function checkSubmission(req ,res, next) {
  try{ 
      let users = []
      let pass 
    if(req.body.password && req.body.username){
      pass = req.body.password
      if (pass.length <= 3){
        next({status:422, message:"Password must be longer than 3 chars"})
      }else{
        users = await Users.findBy({username: req.body.username})
        if (!users.length){ 
          next()
        }else{
          next({status:403, message: 'username taken'})
        }
      }
    }else{
      next({status:422, message:'username and password required'})
    } 
  }catch (err) {
    next(err)
  }
}


async function checkLogin (req ,res, next){
    try{
        if(!req.body.password || !req.body.username){
          next({status:400, message:'username and password required'})
        }else{
          const [userFromDB] = await Users.findBy({username: req.body.username})
          if(!userFromDB){
            next({status:404, message:'user not found'})
          }else if(bcrypt.compareSync(req.body.password.toString(), userFromDB.password)){
            req.user = {
              username: userFromDB.username,
              user_id: userFromDB.user_id,
            }
            next()
          }else{
            next({status:400, message:'invalid credentials'})
          }
        }
    }catch(err){
    next(err)
  }
}

function checkToken (req, res, next) {

  if(!req.headers.authorization){
    next({status:401, message:'Token required'})
  }else{
    const token = req.headers.authorization.split(' ')[1] //for Bearer token
    jwt.verify(token, JWT_SECRET, async (err, decoded)=> {
      if(err){
        return next({status:403, message:'Invalid token'})
      }else{
        const user = await Users.findById(decoded.user_id);
        if( user ) {
          res.user = user;
          next();
        } else {
          next({status: 404, message:'User could not be found'});
        }
      }
    })
  }
};

async function checkLogout (req ,res , next){
  console.log(req.body)
  if(!req.body.user_id || !req.body.username){
    next({status:400, message:'username and user_id required'})
  }else{
    const [userFromDB] = await Users.findBy({username: req.body.username})
    if(!userFromDB){
      next({status:404, message:'user not found'})
    }else{
      next()
    }
  } 
}

module.exports={
  checkToken,
  checkLogin,
  checkLogout,
  checkSubmission,
}