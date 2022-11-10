import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');
function App() {
  const [message, setMessage] = useState('');
  const [messageRecieved, setMessageRecieved] = useState('');
  const sendMessage = () => {
    socket.emit('send_message', { message });
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input
        placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send message</button>
      <h4>Message:</h4>
      {messageRecieved}
    </div>
  );
}

export default App;
