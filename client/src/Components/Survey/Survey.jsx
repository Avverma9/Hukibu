import React, { useEffect, useState } from 'react'
import styles from "./Survey.module.css"
import { FiDelete } from 'react-icons/fi';
import { Modal, Button } from 'react-bootstrap';


const Survey = () => {
    const [surveyData, setSurveyData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [title, setTitle] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState('');
    const [showAll, setShowAll] = useState(false);

    const fetchSurveyData = () => {
        fetch('https://hukibu.onrender.com/get/survey')
          .then((response) => response.json())
          .then((data) => setSurveyData(data))
          .catch((error) => console.error('Error fetching survey data:', error));
      };
    
      useEffect(() => {
        fetchSurveyData();
      }, []);
    
      const handleAddSurveyItem = () => {
        fetch('https://hukibu.onrender.com/create/survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: newQuestion, title: title }),
        })
          .then((response) => response.json())
          .then(() => {
            setShowAddModal(false); 
            setNewQuestion(''); 
            setTitle('');
            fetchSurveyData(); 
          })
          .catch((error) => console.error('Error adding survey item:', error));
      };
    
      const handleDeleteSurveyItem = () => {
        fetch(`https://hukibu.onrender.com/delete/survey/${deletingItemId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then(() => {
            setShowDeleteModal(false); 
            setDeletingItemId(''); 
            fetchSurveyData(); 
          })
          .catch((error) => console.error('Error deleting survey item:', error));
      };
    
      const handleAddModalOpen = () => {
        setShowAddModal(true);
      };
    
      const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewQuestion('');
        setTitle('');
      };
    
      const handleDeleteModalOpen = (id) => {
        setDeletingItemId(id);
        setShowDeleteModal(true);
      };
    
      const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setDeletingItemId('');
      };
    
      const handleSeeMoreClick = () => {
        setShowAll(!showAll);
      };


  return (
    <>
    <div className={styles.category}>
      <h2>Category Definition Skills</h2>
    
      <div className={styles.flex}>
        <p className={styles.box}>Creativity</p>
        <p className={styles.box}>Collaboration</p>
        <button className={styles.btn}>Add More</button>
      </div>
      <div  className={styles.flex} style={{marginTop:"10px"}}>
        <p className={styles.box}>Creativity</p>
        <p className={styles.box}>Collaboration</p>
        <button className={styles.btn}>Remove</button>
      </div>

       
    </div>

    {/* ------------------------------------------------------ */}
          <div className={styles.cancelflex} key="survey-header">
        <h2>Survey questions</h2>
        <button className={styles.seemore} onClick={handleAddModalOpen}>
          Add Questions
        </button>
      </div>


      {surveyData.slice(0, showAll ? surveyData.length : 2).map((surveyItem) => (
        <div key={surveyItem._id} className={styles.survey}>
          <div className={styles.cancelflex}>
            <h2>Q. {surveyItem.title}</h2>
            <h4 onClick={() => handleDeleteModalOpen(surveyItem._id)}>
              <FiDelete />
            </h4>
          </div>
          <p>{surveyItem.question}</p>
        </div>
      ))}

<button className={styles.seemore} onClick={handleSeeMoreClick}>
        {showAll ? "Show Less" : "See More"}
      </button>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Survey Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="form-group">
              <label htmlFor="titleInput">Title</label>
              <textarea
                className="form-control"
                rows="5"
                id="titleInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="questionInput">Question:</label>
              <input
                type="text"
                className="form-control"
                id="questionInput"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSurveyItem}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this survey item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSurveyItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Survey