import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import Login from './components/Login'
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`, {
      auth: {
        username: 'bar',
        password: 'bar',
        email: 'bar'
      }
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header>Chat App</header>
      {socket && <Login socket={socket} />}
    </div>
  );
}

export default App;
