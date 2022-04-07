import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './game.css'
import './online.css'





    
export default function Online({state, socket}) {
    const navigate = useNavigate();
    const [lobbies, updateLobbies] = useState({
        isOpen: false,
        browserData: []
    })

    function startSinglePlayer() {
        state.isLogged && navigate('/online/singlePlayer')
    }

    function close_match_maker(socket) {
        socket.emit('leave')
        updateLobbies({...lobbies, isOpen: false, browserData: []})
    }

    const init_socket = (socket) => {
        socket.emit('auth', sessionStorage.token)
        return socket.on('allgood',() =>{})
    } 

    const init_match_maker = async (state, lobbies, updateLobbies, socket) => {
        if(state.isLogged && sessionStorage.token && init_socket(socket).connected) {
            socket.emit('init-match-maker')
            socket.emit('fetch-matches')
            socket.on('match-maker-join', () => {
               socket.emit('fetch-matches')
            })
            socket.on('matches', (matches) => {
                if(matches.length > 0){
                    updateLobbies({...lobbies, isOpen: true, browserData:[...lobbies.browserData, ...matches]})
                }else{
                    updateLobbies({...lobbies, isOpen: true})
                }
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
                        Socket connections.. Eitherway I hope you enjoy, -Max
                </p>
            </div>
            <div className='online-panel'>     
                <button className='find-create-btn' 
                    onClick={async() => await init_match_maker(state, lobbies, updateLobbies, socket)}>
                    Find or Create a match
                </button>
                <button className='single-player-btn'
                    onClick={() => startSinglePlayer()}
                    >SinglePlayer</button>
            </div>
            <section className={lobbies.isOpen ? 'match-maker-open':'match-maker-closed'}>
                <div className='match-maker-list'>
                    <div className='match-maker-list-nav'>
                        <button 
                            onClick={() => close_match_maker(socket)}
                            className={lobbies.isOpen ? 'match-nav-back-open':'match-nav-back-closed'}
                            > 	
                            &#10094;
                        </button>
                    </div>
                    {lobbies.browserData.length > 0 && lobbies.isOpen ? lobbies.browserData.map( (player, indx) => {
                        return (
                            <div className='MM-player' key={indx}>
                                <p className='MM-tag'>&#9875;</p>
                                <p className='MM-username'>{player.username}</p>
                            </div>
                        )
                    })
                    : 
                    lobbies.isOpen && <div className='MM-empty'><p>Finding Players...</p></div>}
                </div>
            </section>
        </section>
    )
}