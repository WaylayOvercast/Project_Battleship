import shipImg from '../../images/battleship.png'
import { useNavigate } from 'react-router-dom';
import './home.css'

function Home({state}) {
  const navigate = useNavigate();

  const handlePlay = () => {
    if(state.isLogged){
      navigate('/online')
    }else{
      navigate('/register')
    }
  }


  return (
    <div className='home'>
      <h1 className='home-title'>BattleShip</h1>
      <button onClick={() => handlePlay()} className='home-play-btn'>Play</button>
      <div className='menu-image-container'>
        <img draggable="false" className='menu-image' src={shipImg}/>
      </div>
      
      
    </div>
  );
}
  
export default Home;
  