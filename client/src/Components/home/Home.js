import shipImg from '../../images/battleship.png';
import { useNavigate } from 'react-router-dom';
import { clickEffects } from '../../audio/audioHandler';
import './home.css'

function Home({state, FXhandler}) {
  const navigate = useNavigate();

  const handlePlay = () => {
    FXhandler(clickEffects[0], .4)
    setTimeout(() => {
      if(state.isLogged){      
        navigate('/online')
      }else{
        navigate('/register')
      }
    },100)
  }


  return (
    <div className='home'>
      <h1 className='home-title'>BattleShip</h1>
      <button 
        onClick={() => handlePlay()}
        onMouseEnter={() => FXhandler(clickEffects[2], .3) } 
        className='home-play-btn'
        >
          Play
        </button>
      <div className='menu-image-container'>
        <img draggable="false" className='menu-image' src={shipImg}/>
      </div>
    </div>
  );
}
  
export default Home;
  