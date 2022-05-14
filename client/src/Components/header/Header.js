import react from "react";
import { useNavigate, Link } from "react-router-dom";
import navBarImg from '../../images/navbarimg.png';
import hoverClick from '../../audio/hover_click.wav';
import click2 from '../../audio/click2.wav';
import click from '../../audio/click.wav';
import './header.css';


export default function Header ({state, setState, FXhandler, AmbientHandler}) {
    const navigate = useNavigate();
    console.log('STATE', state.isTheme)
    const checkIsLogged = () => {
        if(sessionStorage.user_id && sessionStorage.username && sessionStorage.token){
            return true    
        }
        return false
    }

    const linkHandler = (url) => {
        FXhandler(click, .4)
        setTimeout(() => {
            navigate(url)
        },100)
    }

    const toggleTheme = () => {
        setState({
            ...state,
            isTheme: !state.isTheme
        })
       setTimeout(() => FXhandler(click, .4), 0)
    }

    return (
        <section className="hdr-frame">

            {checkIsLogged() ? 
            <div className="hdr-options">
                <button className="hdr-mute"
                    onClick={() => toggleTheme()}
                    onMouseEnter={() => FXhandler(hoverClick, .3)} 
                    >&#128264;
                </button>
                <button 
                    className="hdr-logout"
                    onMouseEnter={() => FXhandler(hoverClick, .3)} 
                    onClick={() => linkHandler('/logout')}
                    >Logout
                </button>
            </div>
            :
            <div className="hdr-options">
                <button className="hdr-mute"
                    onClick={() => toggleTheme()}
                    onMouseEnter={() => FXhandler(hoverClick, .3)} 
                    >&#128264;    
                </button>
                <button 
                    className="hdr-login"
                    onMouseEnter={() => FXhandler(hoverClick, .3)}
                    onClick={() => linkHandler('/login')}  
                    to= "/login">Login
                </button>
                <button 
                    className="hdr-register"
                    onMouseEnter={() => FXhandler(hoverClick, .3)}
                    onClick={() => linkHandler('/register')}  
                    to= "/register">Register
                </button>
            </div>
            }
            
            <div className="hdr-banner">
                <Link className="hdr-home" to= "/">BattleShip</Link>
                <img  draggable="false" className="hdr-img" src={navBarImg} alt='ship'/>
            </div>
        </section>
    )
}