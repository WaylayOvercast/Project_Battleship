import './App.css';
import { Routes, Route, } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Header from './Components/header/Header';
import LoginForm from './Components/login/LoginForm';
import RegisterForm from './Components/register/RegisterForm';
import Logout from './Components/logout/Logout';
import Home from './Components/home/Home';
import Online from './Components/online/online';
import Singleplayer from './Components/online/singleplayer/Singleplayer';
import { io } from 'socket.io-client'
import { FXhandler, useTheme } from './Components/howler/HowlerHandler';
import { Howl, Howler } from 'howler';

const socket = io.connect('http://localhost:5000');

function App() {
  const [ state, setState] = useState({
    isLogged: false,
    isTheme: false,
  })

  function checkLocalSettings () {
    const settings = localStorage.getItem('PBisTheme')
    if( settings === null || settings === 'true' ) {
      settings === null && localStorage.setItem('PBisTheme', true)
      setState({
        ...state,
        isTheme: true
      })
    } else {
      setState({
        ...state,
        isTheme: false
      })
    }
    console.log(settings)
  }

  useEffect(() => {
    checkLocalSettings()

    if(sessionStorage.user_id && sessionStorage.username && sessionStorage.token){
      
      const profile = {
        user_id: sessionStorage.user_id,
        username: sessionStorage.username,
      }
      const head = {Authorization: `Bearer ${sessionStorage.token}`}
      axios.put('http://localhost:5000/api/auth/rtrauth', profile, {headers : head})
      .then( res => {
        sessionStorage.setItem('token', res.data.token)
        setState((state) => { return {...state, isLogged: true}})
      })
      .catch((err) => console.error(err))

    } else {
      setState((state) => { return {...state, isLogged: false}})
    } 
  },[])

  const [setLoop] = useTheme() /* handles theme and ambient background loops */

  useEffect(() => {
    Howler.unload(); 
    if ( state.isTheme ) {
      localStorage.setItem('PBisTheme', true)
      setLoop(true)
    } else {
      localStorage.setItem('PBisTheme', false)
      setLoop(false)
    } 
  },[state.isTheme])

  return (
    <div className='App'>
      <Header state = {state} setState = {setState} FXhandler = {FXhandler}/>
      <Routes>
        <Route exact path='/online/singlePlayer' element={<Singleplayer state = {state} socket = {socket}/>}/>
        <Route exact path='/online' element={<Online state = {state} setState = {setState} socket = {socket} FXhandler = {FXhandler}/>}/>
        <Route exact path='/' element={<Home state = {state} FXhandler = {FXhandler}/>}/>
        <Route exact path='/login' element={<LoginForm state = {state} setState = {setState} FXhandler = {FXhandler}/>}/>
        <Route exact path='/logout' element={<Logout state = {state} setState = {setState} FXhandler = {FXhandler}/>}/>
        <Route exact path='/register' element={<RegisterForm state = {state} setState = {setState} FXhandler = {FXhandler}/>}/>
      </Routes>
    </div> 
  );
}

export default App;