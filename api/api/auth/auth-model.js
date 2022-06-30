const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_REFRESH} = require('../../variableConfig')


function createToken(user_id, username){
 
    const payload = {
      user_id: user_id,
      username: username
    }
    const options = {
        expiresIn: '1d'               // needs work
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

function find(table, item, condition) {
    return db(table).select(item, condition)         
}

function findBy(filter) {
    return db('user').where(filter)
}

async function findById(uuid) {
    const user = await db('user').select('*')
    .where('user_id', uuid)
    .first()
    return user
}

async function add(user) {
    await db('user').insert(user)
    return findById(user.user_id)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    createToken,
}