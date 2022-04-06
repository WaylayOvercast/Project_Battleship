import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './game.css'
import './online.css'


const init_socket = (socket) => {
    socket.emit('auth', sessionStorage.token)
    return socket.on('allgood', () => {
    })
} 
    
export default function Online({state, socket}) {
    const navigate = useNavigate();
    const [lobbies, updateLobbies] = useState({
        isOpen: false,
        browserData: []
    })

    function startSinglePlayer() {
        state.isLogged && navigate('/online/singlePlayer')
    }

    function openMatchMaker() {
        if(init_socket().connected){
            socket.emit('match')
            updateLobbies({...lobbies, isOpen: true})
        }else{
            return alert('failed to connect to Online match maker')
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
                    onClick={() => openMatchMaker()}>
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
                            onClick={() => updateLobbies({...lobbies, isOpen: false})}
                            className={lobbies.isOpen ? 'match-nav-back-open':'match-nav-back-closed'}
                            > 	
                            &#10094;
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )
}