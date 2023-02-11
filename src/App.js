import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import './App.css';
import Chat from './components/Chat';
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path='/' element={<Login socket={socket} />}/>
            <Route
              path="chat/:roomname/:username"      
              element={<Chat socket={socket} />} 
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
