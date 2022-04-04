import react from "react";
import { Link } from "react-router-dom";
import './header.css'
import navBarImg from '../../images/navbarimg.png'


export default function header ({state}) {

    const checkIsLogged = () => {
        if(sessionStorage.user_id && sessionStorage.username && sessionStorage.token){
            return true    
        }
        return false
    }

    return (
        <section className="hdr-frame">

            {checkIsLogged() ? 
            <div className="hdr-options">
                <Link className="hdr-logout" to= "/logout">Logout</Link>
            </div>
            :
            <div className="hdr-options">
                <Link className="hdr-login" to= "/login">Login</Link>
                <Link className="hdr-register" to= "/register">Register</Link>
            </div>
            }
            
            <div className="hdr-banner">
                <Link className="hdr-home" to= "/">BattleShip</Link>
                <img  draggable="false" className="hdr-img" src={navBarImg} alt='ship'/>
            </div>
            
           
        </section>
    )
}