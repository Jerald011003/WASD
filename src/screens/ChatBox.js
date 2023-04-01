import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../actions/chatboxActions';
import { FaGamepad } from 'react-icons/fa';
import '../../src/styles/Chatbox.css';

function Chatbox() {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const chatbox = useSelector(state => state.chatbox);
  const { messages } = chatbox;

  const userInfo = useSelector(state => state.userLogin.userInfo);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addMessage(message));
    setMessage('');
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2><FaGamepad className="gamepad-icon" /> Chatbox</h2>
      </div>
      <div className="chatbox-body">
        <ul className="chatbox-messages">
          {messages.map((message, index) => (
            <li key={index}>
              <span className="message-name">{message.name}:</span> <span className={message.name === userInfo ? "sent-message" : "received-message"}>{message.text}</span>
            </li>
          ))}
        </ul>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="chatbox-input" />
            <button type="submit" className="chatbox-send-btn">Send</button>
          </form>
        ) : (
          <p className="chatbox-login-msg">Please log in to join the chat.</p>
        )}
      </div>
    </div>
  );
}

export default Chatbox;
