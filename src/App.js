import React, {useState} from 'react'
import Login from './components/Login'
import './App.css';
import Chat from './components/Chat/Chat';

function App() {
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      {!socket ? <Login setSocket={setSocket} /> : <Chat socket={socket}/>}
    </div>
  );
}

export default App;
