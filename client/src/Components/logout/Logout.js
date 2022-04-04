import react, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Logout ({state, setState}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        
        const user = {
            user_id: sessionStorage.user_id,
            username: sessionStorage.username
        }

        axios.put('http://localhost:5000/api/auth/logout', user)
        .then(res => {
            console.log(user)
            sessionStorage.clear()
            setState({...state, isLogged: false});
            navigate('/')
        })
        .catch(err => {
            console.error(err)
            setState({...state, isLogged: false})
            navigate('/')
        })
    },[])

    return(
        <h1 className="logout-msg">Logging out..</h1>
    )
}