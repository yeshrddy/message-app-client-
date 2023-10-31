import React from 'react'
import NavBar from './components/NavBar';
import './app.css'
import MessageWindow from './components/MessageWindow';

const App = ()=> {
    return (
        <>
            <NavBar/>
            <MessageWindow />
        </>
    )
}

export default App