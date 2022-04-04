const {PORT} = require('./variableConfig')
const server = require('./api/core/server')

server.listen(PORT, () => {
    console.log(`\n*** Battleship departed from port: ${PORT} ***\n`)
})