import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

    function createGrid (player) {
        let grid = []
        
        if(player){
            for( let x = 0; x < 10; x++){
                grid.push([])
                for(let y = 0; y < 10; y++){
                    grid[x].push(0)
                }
            }
        }else if(!player){
            for( let x = 0; x < 10; x++){
                grid.push([])
                for(let y = 0; y < 10; y++){
                  grid[x].push(0)
                }
            }
        }
        return grid
    }

    function displayGrid(player){
        for(let x = 0; x < 100; x++){
            
        }
    }

export default function Singleplayer () {
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
        playerGrid: []
    })

    useEffect(() => {
        const grid = createGrid(true)
        setGameData({...gameData, playerGrid: grid})
    },[])

    return (
        <section className='game-window'>
            <div className='game-window-nav'>

            </div>
            <section className='enemy-board'>
                {
                    
                }
            </section>
            <section className='self-board'>
                {}
            </section>
 
        </section> 
    )
}