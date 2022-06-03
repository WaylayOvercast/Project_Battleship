import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FXhandler } from "../../howler/HowlerHandler";
import { clickEffects } from "../../../audio/audioHandler";
import { useDrag } from "react-dnd";


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
    });
    const [commanderWindow, setCommanderWindow] = useState({
        carrier: true,
        battleShip: true,
        destroyer: true,
        submarine: true,
        ptBoat: true,
    });
    const [{isDragging}, drag] = useDrag(() => ({
        type: "ship",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),  //gonna need lots of work here
        }),
    }));
    const tileRef = useRef(null);


    
    useEffect(() => {
        console.log(isDragging)
    },[isDragging])

    useEffect(() => {
        console.log('width', tileRef.current.offsetWidth)
        console.log('height', tileRef.current.offsetHeight)
    },[isDragging])

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
                        if ( indx > 0 ) {
                            return <div key={`p-${indx}`} id={`tile p-${indx}`} >{`${indx}`}</div> 
                        } else {
                            return <div ref={tileRef} key={`p-${indx}`} id={`tile p-${indx}`} >{`${indx}`}</div>
                        }
                    })
                }
            </section>
            <div className='game-commands-window'>
                <div className='drop-window'>
                    <div 
                        className="ship carrier"
                        ref={drag} // need fix for ref and height of each ship should be set correctly
                        id="1">

                    </div>
                    <div 
                        className="ship battleShip"
                        ref={drag}
                        id="2">

                    </div>
                    <div 
                        className="ship destroyer"
                        ref={drag}
                        id="3">

                    </div>
                    <div 
                        className="ship submarine"
                        ref={drag}
                        id="4">

                    </div>
                    <div 
                        className="ship ptBoat"
                        ref={drag}
                        id="5">

                    </div>
                </div>
            </div>
        </section> 
    )
}