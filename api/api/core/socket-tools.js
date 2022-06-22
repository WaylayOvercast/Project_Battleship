
const Users = require('../auth/auth-model')
const Match = require('./core-model')
const {JWT_SECRET} = require('../../variableConfig')
const jwt = require('jsonwebtoken')

module.exports = {
  start: function (io) {

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
      const countryOfOrigin = socket.handshake.headers["accept-language"].split(',')[0]
      socket.on('auth', token => {
        
        if(authenticate(token)){
          socket.emit('allgood')
          socket.handshake.auth.token = token
          socket.handshake.auth.user = jwt.decode(token)
          
          socket.on('init-match-maker', () => {
            socket.join('match-maker')
            socket.to('match-maker').emit('match-maker-refresh')
          })
          
          socket.on('fetch-matches', async () => {
            const socks = await io.in('match-maker').fetchSockets()
            const players = []
            for(let x = 0; x < socks.length && x < 10; x++){
              if(socks[x].id !== socket.id){
                players.push(
                  {
                    id: socks[x].id,
                    username: socks[x].handshake.auth.user.username,
                    country: countryOfOrigin,
                  }
                )
              }
            }
            socket.emit('matches', players)
          })
          socket.on('invite-player', ({ target, user }) => {
            console.log(user)
            socket.to(target).emit('recieved-invite', user)
          })
          socket.on('accept-invite', ({ target, user }) => {
            socket.to(target).emit('invite-accepted', user)
            socket.join(target)
          })
          socket.on('decline-invite', ({ target, user }) => {
            socket.to(target).emit('invite-declined', user)
          })
      
          socket.on('leave', () => {
            socket.to('match-maker').emit('match-maker-refresh')
            socket.leave('match-maker')
          })
          
        }else{
          socket.disconnect() 
        }
      })


      socket.on('disconnect', () => {
        console.log('disconnected', socket.id)
      })
    })
  }
}
