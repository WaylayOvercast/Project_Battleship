import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clickEffects, sonarEffects } from '../../audio/audioHandler';
import './game.css';
import './online.css';


export default function Online({state, setState, socket, FXhandler}) {
    const navigate = useNavigate();
    const [lobbies, updateLobbies] = useState({
        isOpen: false,
        dropDown: {isDropDown:false, id:''},
        browserData: [],
    })
    const [outgoingInvites, updateOutgoing] = useState([])
    const [incomingInvites, updateIncoming] = useState([])

    function startSinglePlayer() {
        FXhandler(clickEffects[0], .3)
        setTimeout(() => {
            state.isLogged && navigate('/online/singlePlayer')
        }, 100);
        
    }

    function close_match_maker(socket) { // this needs to be fixed
        FXhandler(clickEffects[0], .3)
        socket.emit('leave')
        console.log("LEAVING")
        updateLobbies({...lobbies, isOpen: false})
    }

    function createInvite (player, socket) {
        FXhandler(clickEffects[1], .3)
        socket.emit('invite-player', { target: player.id, user: {name: sessionStorage.username, id: socket.id }})
        updateOutgoing( (outgoingInvites) => {
            return [...outgoingInvites, {name: player.username, id: player.id, status: 'Pending...'}]
        })
    }
    
    function handleDropDown(player){
        if(lobbies.dropDown.isDropDown && lobbies.dropDown.id === player.id){
            return true
        }
        return false
    }

    async function RespondToInvite(invite, gameOn, socket) {
        if(gameOn){
            await FXhandler(clickEffects[1], .3)
            socket.emit('accept-invite', ({target: invite.id, user: socket.id}))
        }else{
            await FXhandler(clickEffects[1], .3)
            socket.emit('decline-invite', {target: invite.id, user: { name: sessionStorage.username, id: socket.id}})
            const invites = [...incomingInvites].filter( item => {
                return item.id !== invite.id
            })
            updateIncoming([...invites])
        }
    }

    function init_match_maker (socket) {
        FXhandler(clickEffects[0], .3)
        FXhandler(sonarEffects[0], .3)
        console.log("INIT SOCKET")
        if (state.isLogged && sessionStorage.token) {
            socket.emit('auth', sessionStorage.token)
            
            socket.on('allgood',() =>{

                updateLobbies((lobbies) => {
                    return {...lobbies, isOpen: true}
                })
                socket.emit('init-match-maker')
                socket.emit('fetch-matches')
            
                socket.on('match-maker-refresh', () => {
                    console.log('FETCH-MATCHES')
                    socket.emit('fetch-matches')
                })
                socket.on('recieved-invite', (invite) => {
                    updateIncoming( (incomingInvites) => {
                        return [...incomingInvites, invite]
                    })
                    FXhandler(clickEffects[1], .3)
                })
                socket.on('invite-declined', (invite) => {
                    updateOutgoing( (outgoingInvites) => {
                        const list = outgoingInvites.map( item => {
                            if(item.name === invite.name){
                                return {...item, status: 'Declined'}
                            }else{
                                return item
                            }
                        })
                        return [...list]
                    })
                    setTimeout(() => {
                        updateOutgoing( (outgoingInvites) => {
                            const cleaned = outgoingInvites.filter( invite => {
                                return invite.status !== 'Declined'
                            })
                            return [...cleaned]
                        })
                    },60000)
                })
                socket.on('invite-accepted', (user) => {
                    console.log('invite-accepted', user)
                })
                socket.on('matches', (matches) => {
                    if(matches.length > 0) {
                        updateLobbies( (lobbies) => {
                        return {...lobbies, browserData:[...matches]}
                        })
                    }
                })
            })
        } else {
            alert('Failed to connect to Online match maker! :(')
        }
    }

    return (
        <section className='online'> 
            <div className='online-welcome'>
                <p>Welcome to Project BattleShip, This is a small project I decided
                        to create mainly for the purpose of gaining a better understanding of 
                        Socket connections.. Eitherway I hope you enjoy -Max
                </p>
            </div>
            <div className='online-panel'>     
                <button className='find-create-btn'
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)} 
                    onClick={() => init_match_maker(socket)}>
                    Find or Create a match
                </button>
                <button className='single-player-btn'
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)} 
                    onClick={() => startSinglePlayer()}
                    >SinglePlayer</button>
            </div>
            <section className={lobbies.isOpen ? 'match-maker-open':'match-maker-closed'}>
                <div className='match-maker-list'>
                    <div className='match-maker-list-nav'>
                        <button 
                            onMouseEnter={() => FXhandler(clickEffects[2], .3)}
                            onClick={() => close_match_maker(socket)}
                            className={lobbies.isOpen ? 'match-nav-back-open':'match-nav-back-closed'}
                            > 	
                            &#10094;
                        </button>
                    </div>
                    {lobbies.browserData.length > 0 && lobbies.isOpen ? lobbies.browserData.map( (player, indx) => {
                        return (
                            <div className={'MM-player'} key={indx} 
                                onClick={() => 
                                    updateLobbies(
                                        {
                                            ...lobbies,  
                                            dropDown:{ isDropDown:!lobbies.dropDown.isDropDown, id:player.id }
                                        }
                                    )}>
                                <p className='MM-tag'>&#9875;</p>
                                <p className='MM-username'>{player.username}</p>
                                <p className='MM-country'>{player.country}</p>
                                {handleDropDown(player) && 
                                    <div key= {`dropDown ${indx}`}className='MM-player-dropdown'>
                                        <button className='MM-player-invite'
                                            onMouseEnter={() => FXhandler(clickEffects[2], .3)}
                                            onClick={() => createInvite(player, socket)}>
                                            Challenge
                                        </button>
                                        <p>&#10096;&#10096;</p> 
                                    </div>
                                }
                            </div>
                        )
                    })
                    : 
                    lobbies.isOpen && <div className='MM-empty'><p>Finding Players...</p></div>}
                </div>
                <div className='match-maker-invites'>
                    {   
                        outgoingInvites.length > 0 && lobbies.isOpen && outgoingInvites.map( (invite, indx) => {
                            return( 
                                <div key={indx} className={ invite.status === 'Pending...' ? 'listed-invite-outgoing' : 'listed-invite-outgoing-declined'}>
                                    {`you've invited ${invite.name}!`}
                                    <div className='listed-options'>
                                        <p className='pending-invite'>{invite.status}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {   
                        incomingInvites.length > 0 && lobbies.isOpen && incomingInvites.map( (invite, indx) => {
                            return( 
                                <div key={indx} className='listed-invite'>
                                    {`${invite.name} has challenged you!`}
                                    <div className='listed-options'>
                                        <button className='listed-invite accept' 
                                            onClick={() => RespondToInvite(invite, true, socket)}
                                            onMouseEnter={() => FXhandler(clickEffects[2], .3)}
                                            >
                                            Accept
                                        </button>
                                        <button className='listed-invite decline' 
                                            onClick={() => RespondToInvite(invite, false, socket)}
                                            onMouseEnter={() => FXhandler(clickEffects[2], .3)}
                                            >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}