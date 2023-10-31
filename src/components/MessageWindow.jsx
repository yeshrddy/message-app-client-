import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const MessageWindow = () => {
  const [textArea, setTextArea] = useState('');
  const [messages, setMessages] = useState([]);
  const messageAreaRef = useRef();

  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textArea.trim() !== '') { // Check if textArea is not empty or only contains whitespace
      const newMessage = { message: textArea, sent: true };
      setMessages([...messages, newMessage]);
      socket.emit('send__message', { textArea });
      setTextArea('');
    }
  };  

  useEffect(() => {
    socket.on('receive__message', (data) => {
      const newMessage = { message: data.message, sent: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  useEffect(()=> {
    // Scroll down to the bottom of the message area
    messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    
  }, [messages])

  return (
    <div className="message-window">
      <main className="main">
        <ul className="message-area" ref={messageAreaRef}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={message.sent ? 'user__message' : 'user__message user__message--others'}
            >
              {message.message}
            </li>
          ))}
        </ul>
        <form action="#" className="text-area">
          <input
            type="text"
            name="message"
            value={textArea}
            onChange={handleChange}
          />
          <button className="send" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default MessageWindow;
