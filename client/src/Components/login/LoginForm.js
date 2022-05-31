import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { clickEffects } from '../../audio/audioHandler';
import missionFailed from '../../audio/Mission-Failed.mp3';
import UseHandleError from '../Utils/handlers';

function LoginForm ({state, setState, FXhandler}){
    const [form, setForm] = useState({});
    const [isError, checkError] = UseHandleError();
    const navigate = useNavigate();
    
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
            
                sessionStorage.setItem('username', form.username)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user_id', res.data.user_id)
                setState({...state, isLogged: true })
                navigate('/')

            }, 100)
        }).catch((err) => {
            checkError(err.response)
        }) 
    }

    return (
        <>
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
                    <p>cant login? &nbsp;
                        <div className= 'missionFailed'
                            onClick={() => FXhandler(missionFailed)}>
                                click here
                        </div>
                    </p>
                </form>
            </div>
            {
                isError && 
                <div className='error-card'>
                    <p>
                        {isError}
                    </p>
                </div>
            }
        </>
    )
}

export default LoginForm
