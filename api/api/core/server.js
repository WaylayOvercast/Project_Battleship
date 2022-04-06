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
server.use(express.json(), cors(corsOptions));// in dev

server.use('/api/auth', authRouter);
server.use('/api/core', coreRouter, checkToken); //needs coreRouter // only logged-in users should have access!
 
const socket_tools = require('./socket-tools');

socket_tools.start(io); // imported socket functions *needs work*

server.get('/', (req, res, next)=> { res.status(200)});


server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});


module.exports = httpServer
