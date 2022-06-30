const express = require('express');
const authRouter = require('../auth/auth-router');
const coreRouter = require('../core/core-router');
const {checkToken} = require('../middleware/auth-middle');
const cors = require('cors');
const http = require('http');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}// will need to be changed for heroku

const server = express();
const httpServer = http.createServer(server);
const io = require('socket.io')(httpServer, {cors: corsOptions} )
server.use(express.json(), cors(corsOptions));

server.use('/api/auth', authRouter); // auth in testing, needs improvements.
server.use('/api/core', coreRouter, checkToken); // only logged-in users should have access!
 
const socket_tools = require('./socket-tools');

socket_tools.start(io); // imported socket functions *needs work*

server.get('/', (req, res, next)=> { res.status(200)});


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
    });
});


module.exports = httpServer
