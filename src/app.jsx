import React from 'react'
import NavBar from './components/NavBar';
import './app.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MessageWindow from './components/MessageWindow';
import Popup from './components/Popup';
import io from 'socket.io-client';

const socket = io.connect('https://message-app-demo.onrender.com');

const App = ()=> {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Popup socket={socket}/>} />
                <Route path='/:id' element={<MessageWindow socket={socket}/>} />
            </Routes>
        </Router>
    )
}
export default App
