import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FXhandler } from "../../howler/HowlerHandler";
import { clickEffects } from "../../../audio/audioHandler";


const init_singlePlayerGame = (socket) => {

}

const renderGrid = () => {
    let grid = []
    for(let count = 0; count < 100; count++){
        grid.push(0)
    }
    return grid
}

export default function Singleplayer () {
    const navigate = useNavigate()
    const [ gameData, setGameData] = useState({
        firstLoad: true,
        setUp: true,
        playersTurn: true,
        ships: {
            carrier:[0,0,0,0,0],
            battleShip:[0,0,0,0],
            destroyer:[0,0,0],
            submarine:[0,0,0],
            ptBoat:[0,0]
        },
        selected: {}
    })
    const [commanderWindow, setCommanderWindow] = useState({
        carrier: true,
        battleShip: true,
        destroyer: true,
        submarine: true,
        ptBoat: true,
    })


    useEffect(() => {
        
    },[])

    const handleQuit = () => {
        FXhandler(clickEffects[0], .4)
        setTimeout(() => {
            const confirm = window.confirm('All current game progress will be lost, Are you sure? ')
            confirm && navigate('/online')
        },100)
    }

    const handlePlay = () => {
        alert(`not implemented yet :'(`)
    }

    const handleFire = () => {
        alert(`not implemented yet :'(`)
    }

    return (
        <section className='game-window'>
            <div className='game-window-nav'>
                <button className="game-nav-btn" 
                    onClick={() => handleQuit()}
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)}>
                        &#10094;
                </button>
                <button className="game-play-btn"
                    onClick={() => handlePlay()}
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)}>
                        Play
                </button>
                <button className="game-fire-btn"
                    onClick={() => handleFire()}
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)}>
                        Fire
                </button>
            </div>
            <section className='enemy-board'>
                {
                    renderGrid().map((elm, indx) => {
                      return <div key={`e-${indx}`} id={`tile e-${indx}`} >{`${indx}`}</div>
                    })
                }
            </section>
            <section className='self-board'>
                {
                    renderGrid().map((elm, indx) => {
                      return <div key={`p-${indx}`} id={`tile p-${indx}`} >{`${indx}`}</div>
                    })
                }
            </section>
            <div className='game-commands-window'>
                <div className="ship-carrier">

                </div>
                <div className="ship-battleShip">

                </div>
                <div className="ship-destroyer">

                </div>
                <div className="ship-submarine">

                </div>
                <div className="ship-ptBoat">
                    
                </div>
            </div>
        </section> 
    )
}