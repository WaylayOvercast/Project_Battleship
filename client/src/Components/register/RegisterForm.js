//import { useRecoilState } from 'recoil'
import react, {useEffect, useState} from 'react';
//import storage from './RecoilState'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import hoverClick from '../../audio/hover_click.wav';
import woodThud from '../../audio/wood_thud.wav';

function RegisterForm ({ state, setState, FXhandler }){
    const [form, setForm] = useState({})
    const navigate = useNavigate();
    //const [store, setStore] = useRecoilState(storage)

    const redirect = () => {
        navigate('/login')
    }

    useEffect(() => {
        setForm({...form, user_id: uuidv4()})
    },[])  

    const handleUser = e =>{
        e.preventDefault()
        setForm({...form, username: e.target.value})
        console.log(form)
    }

    const handlePass = e =>{
        e.preventDefault()
        setForm({...form, password: e.target.value})
        console.log(form)
    }

    const submitUser = e =>{
        e.preventDefault()
        console.log(form)
        axios.post('http://localhost:5000/api/auth/register', form)
        .then( res => {
            FXhandler(woodThud)
            setTimeout(() => {
                sessionStorage.setItem('username', form.username)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user_id', form.user_id)
                setState({...state, isLogged:true})
                navigate('/')
            }, 100)
        }).catch(err => console.error(err))        
    }


    return(
        <div className='login-card'>
            <form className='login-form' onSubmit={submitUser}>
            Create an account!
                <label>Username:
                    <input id='user_in' maxLength={15} onChange={handleUser} type='text'/>
                </label>
                <label>Password:
                    <input id='pass_in' maxLength={60} onChange={handlePass} type='password'/>
                </label>
                <button 
                    onMouseEnter={() => FXhandler(hoverClick)}
                    type='submit'>Create
                </button>
                <a className='login-redirect' onClick={() => redirect()}>already have one?</a>
            </form>
        </div>
    )
}

export default RegisterForm