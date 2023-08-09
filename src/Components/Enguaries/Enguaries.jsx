import React, { useState, useEffect } from 'react';
import styles from './Enguaries.module.css';
import { Modal, Button } from 'react-bootstrap';

const Enguaries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [currentEnquiry, setCurrentEnquiry] = useState(null);
  const [showAllEnquiries, setShowAllEnquiries] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deletingEnquiryId, setDeletingEnquiryId] = useState(null);
  

  useEffect(() => {
    fetch('https://hukibu.onrender.com/get/enq')
      .then((response) => response.json())
      .then((data) => {
        setEnquiries(data);
      })
      .catch((error) => console.error('Error fetching enquiries:', error));
  }, []);

  const handleAnswerClick = (enquiry) => {
    setCurrentEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEnquiry(null);
    setNewAnswer('');
  };

  const handleAnswerSubmit = () => {
    fetch(`https://hukibu.onrender.com/create/enq/${currentEnquiry._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newAnswer }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedEnquiries = enquiries.map((enquiry) =>
          enquiry._id === currentEnquiry._id ? { ...enquiry, message: newAnswer } : enquiry
        );
        setEnquiries(updatedEnquiries);
      })
      .catch((error) => console.error('Error posting answer:', error));

    handleCloseModal();
  };

  const handleIgnoreClick = (enquiryId) => {
    setDeletingEnquiryId(enquiryId);
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setIsConfirmationModalOpen(false);

    fetch(`https://hukibu.onrender.com/delete/enq/${deletingEnquiryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredEnquiries = data.filter((enquiry) => enquiry.enquiry);
          setEnquiries(filteredEnquiries);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((error) => console.error('Error deleting enquiry:', error));

    setDeletingEnquiryId(null);
  };

  const handleDeleteCancel = () => {
    setIsConfirmationModalOpen(false);
    setDeletingEnquiryId(null);
  };

  const handleSeeMoreClick = () => {
    setShowAllEnquiries(true);
  };

  return (
    <>
      <h2 className={styles.h2title}>Enquiries</h2>
      {enquiries.slice(0, showAllEnquiries ? enquiries.length : 3).map((enquiry) => (
        <div className={styles.main} key={enquiry._id}>
          <div className={styles.container}>
            <div className={styles.imagediv}>
              <img
                className={styles.image}
                src={
                  enquiry.imageSrc ||
                  'https://www.shutterstock.com/image-vector/smart-boy-character-isolated-flat-600w-2230182563.jpg'
                }
                alt="avatar"
              />
            </div>
            <div className={styles.content}>{enquiry.enquiry}</div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.answerbtn}
              onClick={() => handleAnswerClick(enquiry)}
              disabled={currentEnquiry === enquiry}
            >
              Answer
            </button>
            <div style={{ marginLeft: '10px' }} />
            <button
              className={styles.ignorebtn}
              onClick={() => handleIgnoreClick(enquiry._id)}
              disabled={currentEnquiry === enquiry}
            >
              Ignore
            </button>
          </div>
          {currentEnquiry === enquiry && (
            <div className={styles.answerInput}>
              <textarea
                className="form-control"
                rows="5"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <div className={styles.buttons}>
                <button className={styles.submitAnswer} onClick={handleAnswerSubmit}>
                  Submit Answer
                </button>
                <div style={{ marginLeft: '10px' }} />
                <button className={styles.cancelAnswer} onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {!showAllEnquiries && (
        <button className={styles.seemorebtn} onClick={handleSeeMoreClick}>
          See More
        </button>
      )}

      {isConfirmationModalOpen && (
        <Modal show={isConfirmationModalOpen} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this enquiry?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              No
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmation}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Post Your Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows="5"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAnswerSubmit}>
            Post Answer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Enguaries;
