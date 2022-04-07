import './App.css';
import storage from './RecoilState';
import { useRecoilState } from 'recoil'
import { Routes, Route, } from 'react-router-dom';
import axios from 'axios';
import react, { useState, useEffect } from 'react';
import Header from './Components/header/Header';
import LoginForm from './Components/login/LoginForm';
import RegisterForm from './Components/register/RegisterForm';
import Logout from './Components/logout/Logout';
import Home from './Components/home/Home';
import Online from './Components/online/online';
import Singleplayer from './Components/online/singleplayer/Singleplayer';
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

function App() {
  const [ store, setStore ] = useRecoilState(storage);
  const [ state, setState] = useState({
    isLogged: false,
  })
  
  useEffect(() => {
    if(sessionStorage.user_id && sessionStorage.username && sessionStorage.token){
      const profile = {
        user_id: sessionStorage.user_id,
        username: sessionStorage.username,
      }
      const head = {Authorization: `Bearer ${sessionStorage.token}`}
      axios.put('http://localhost:5000/api/auth/rtrauth', profile, {headers : head})
      .then( res => {
        sessionStorage.setItem('token', res.data.token)
        setState({...state, isLogged:true})
      })
      .catch((err) => console.error(err))
    }
  },[])
  
  

  return (
    <div className='App'>
      <Header state = {state}/>
      <Routes>
        <Route exact path='/online/singlePlayer' element={<Singleplayer state = {state} socket = {socket}/>}/>
        <Route exact path='/online' element={<Online state = {state} socket = {socket}/>}/>
        <Route exact path='/' element={<Home state = {state}/>}/>
        <Route exact path='/login' element={<LoginForm state = {state} setState = {setState}/>}/>
        <Route exact path='/logout' element={<Logout state = {state} setState = {setState}/>}/>
        <Route exact path='/register' element={<RegisterForm state = {state} setState = {setState}/>}/>
      </Routes>
    </div> 
  );
}

export default App;


/* <Route exact path= '/' element={<Home/>}/>
      <Route exact path='/register' element={<RegisterForm/>}/>
      <Route path='/login' element={<LoginForm />}/> */