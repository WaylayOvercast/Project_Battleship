const db = require('../../data/dbConfig')

// ***entire file is subject to changes***

async function inviteUser(challenger_id, defender_id){
    await db('invite').insert({defender_user_id: defender_id, challenger_user_id:challenger_id})
    return await db('invite').select('*').where('challenger_user_id', challenger_id).andWhere('defender_user_id', defender_id)
}

async function replyToInvite(bool, invite_id){
    if(bool){
        const [match] = await db('invite').select('*').where('invite_id', invite_id)
        await db('invite').del().where('invite_id', invite_id)
        const [result] = await createMatch(match.defender_user_id, match.challenger_user_id)
        console.log(result)
        return result
    }else{
        await db('invite').del().where('invite_id', invite_id)
        return 'match declined'
    }
}

async function createMatch (defender_id, challenger_id){
    await db('match').insert({defender_user_id: defender_id, challenger_user_id:challenger_id})
    return await db('match').select('*').where('defender_user_id', defender_id).andWhere('challenger_user_id', challenger_id)
}

async function endMatch (match_id){
    await db('match').del().where('match_id', match_id)
}

module.exports = {
    inviteUser,
    createMatch,
    endMatch,
    replyToInvite
}