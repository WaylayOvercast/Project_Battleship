import React, {useEffect, useState} from 'react';
//import storage from './RecoilState'
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { clickEffects } from '../../audio/audioHandler';

function LoginForm ({state, setState, FXhandler}){
    const [form, setForm] = useState({})
    const navigate = useNavigate();
    //const [store, setStore] = useRecoilState(storage)
    
    const handleUser = e =>{
        e.preventDefault()
        setForm({...form, username: e.target.value})
    }

    const handlePass = e =>{
        e.preventDefault()
        setForm({...form, password: e.target.value})
    }

    const submitUserLogin =(e)=>{
        e.preventDefault()
        axios.put('http://localhost:5000/api/auth/login', form)
        .then( res => {
            FXhandler(clickEffects[0], .4)
            setTimeout(() => {
                //setStore({islogged: true})
                sessionStorage.setItem('username', form.username)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user_id', res.data.user_id)
                setState({...state, isLogged:true})
                navigate('/')
            }, 100)
        }).catch(err => console.error(err)) 
    }
 

    return(
        <div className='login-card'>
            <form className='login-form' onSubmit={submitUserLogin}>
                <label>Username:
                    <input id='user_in' maxLength={15} onChange={handleUser} type='text'/>
                </label>
                <label>Password:
                    <input id='pass_in' maxLength={60} onChange={handlePass} type='password'/>
                </label>
                <button
                    onMouseEnter={() => FXhandler(clickEffects[2], .3)} 
                type='submit'>Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm