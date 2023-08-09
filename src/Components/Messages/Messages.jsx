import React, { useState, useEffect } from 'react';
import styles from "./Messages.module.css";
import { Modal, Button } from 'react-bootstrap';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({ username: '', message: '' });
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    fetch('https://hukibu.onrender.com/get/message')
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMessage({ username: '', message: '' });
  };

  const handleMessageSubmit = () => {
    fetch('https://hukibu.onrender.com/create/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
      })
      .catch((error) => console.error('Error posting message:', error));

    handleCloseModal();
  };

  const handleShowMoreClick = () => {
    setShowAllMessages(true);
  };

  return (
    <div>
      <h2 className={styles.h2title}>Messages</h2>
      {messages.slice(0, showAllMessages ? messages.length : 3).map((message) => (
        <div className={styles.main} key={message._id}>
          <div className={styles.container}>
            <div className={styles.imagediv}>
              <img
                className={styles.image}
                src="https://www.shutterstock.com/image-vector/smart-boy-character-isolated-flat-600w-2230182563.jpg"
                alt="avatar"
              />
            </div>
            <div className={styles.content}>
              {message.message}
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.answerbtn} onClick={handleOpenModal}>
              Message
            </button>
          </div>
        </div>
      ))}

<Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="usernameInput">Username:</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                value={newMessage.username}
                onChange={(e) => setNewMessage({ ...newMessage, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="messageInput">Message:</label>
              <textarea
                className="form-control"
                rows="5"
                id="messageInput"
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleMessageSubmit}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>

      {!showAllMessages && (
        <button className={styles.seemorebtn} onClick={handleShowMoreClick}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Messages;
