import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const createMatrix = () => {
    let grid = []
    for(let x = 0; x < 10; x++){
        grid.push([])
        for(let y = 0; y < 10; y++){
            grid[x].push(0)
        }
    }
    return grid
}

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

    const redirect = () => {
        navigate('/online')
    }

    useEffect(() => {
        
    },[])

    return (
        <section className='game-window'>
            <div className='game-window-nav'>
                <button className="game-nav-btn" onClick={() => redirect()}> &#10094;</button>
                <button className="game-play-btn">Play</button>
                <button className="game-fire-btn">Fire</button>
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
                
            </div>
        </section> 
    )
}