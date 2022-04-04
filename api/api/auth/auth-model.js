const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_REFRESH} = require('../../variableConfig')
const cleanup = require('node-schedule');


function createToken(user_id){
 
    const payload = {
      user_id: user_id,
    }
    const options = {
        expiresIn: '1d'               // needs work
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

async function findOthers (id) {
    const others = await db('user').whereNot('user_id', id)
    if(!others){
        return "no players found :("                //will probably be removed in favor of socket
    }else{
        return others
    }
}

    // all below are pending SSL and postgress changes *subject to change*

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

async function add(user, uuid) {
    await db('user').insert(user)
    return findById(uuid)
}

async function setIsActive(uuid, bool){
    await db('user').update({isActive: bool}).where('user_id', uuid)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    createToken,
    findOthers,
    setIsActive
}