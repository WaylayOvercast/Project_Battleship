const db = require('../../data/dbConfig')

// ***entire file is subject to changes***

async function createMatch (defender_id, challenger_id){
    await db('match').insert({defender_user_id: defender_id, challenger_user_id:challenger_id})
    return await db('match').select('*').where('defender_user_id', defender_id).andWhere('challenger_user_id', challenger_id)
}

async function endMatch (match_id){
    await db('match').del().where('match_id', match_id)
}

module.exports = {
    createMatch,
    endMatch,
}