
const Users = require('../auth/auth-model')
const Match = require('./core-model')
const {JWT_SECRET} = require('../../variableConfig')
const jwt = require('jsonwebtoken')

module.exports = {
  start: function (io) {

    // io.use(( socket, next )=> {      // jwt verification needs to be implemented 
    //   if(socket.handshake.query){
    //     jwt.verify(socket.handshake.query, JWT_SECRET, (err, decoded) => {
    //       if(err) return next(new Error('Auth error/Invalid token'));
    //       socket.decoded = decoded
    //       next();
    //     });
    //   }else{
    //     next(new Error('No token found'));
    //   }
    // })
    const authenticate = (token) => {
      return jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
          return false
        } else {
          return true
        } 
      })
    }

    io.on('connection', (socket) => {
      
      console.log('connected', socket.id)
      socket.on('auth', token => {
        console.log('is_auth?:',authenticate(token))
        if(authenticate(token)){
          socket.emit('allgood')
        }else{
          socket.disconnect() 
        }
      })
      socket.on('match', (socket) => {
        console.log('matching...', socket.id)
      })
      socket.on('disconnect', () => {
        console.log('disconnected', socket.id)
      })
    })
    
            
     
  }
}