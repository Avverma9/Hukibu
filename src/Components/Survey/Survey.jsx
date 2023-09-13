import React, { useEffect, useState } from "react";
import styles from "./Survey.module.css";
import { FiDelete } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";

const Survey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState("");
  const [showAll, setShowAll] = useState(false);

  const fetchSurveyData = () => {
    fetch("http://139.59.68.139:3000/admin-get-all-survey")
      .then((response) => response.json())
      .then((data) => setSurveyData(data.data))
      .catch((error) => console.error("Error fetching survey data:", error));
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const handleAddSurveyItem = () => {
    fetch("http://139.59.68.139:3000/admin-add-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    })
      .then((response) => response.json())
      .then(() => {
        setShowAddModal(false);
        setQuestion("");
        fetchSurveyData();
      })
      .catch((error) => console.error("Error adding survey item:", error));
  };

  const handleDeleteSurveyItem = () => {
    fetch(`http://139.59.68.139:3000/admin-delete-survey/${deletingItemId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(() => {
        setShowDeleteModal(false);
        setDeletingItemId("");
        fetchSurveyData();
      })
      .catch((error) => console.error("Error deleting survey item:", error));
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setQuestion("");
  };

  const handleDeleteModalOpen = (id) => {
    setDeletingItemId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setDeletingItemId("");
  };

  const handleSeeMoreClick = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      {/* ------------------------------------------------------ */}
      <div className={styles.cancelflex} key="survey-header">
        <h2>Survey questions</h2>
        <button className={styles.seemore} onClick={handleAddModalOpen}>
          Add Questions
        </button>
      </div>

      {Array.isArray(surveyData) && surveyData
  .slice(0, showAll ? surveyData.length : 2)
  .map((surveyItem) => (
          <div key={surveyItem.id} className={styles.survey}>
            <div className={styles.cancelflex}>
              <h6>Q. {surveyItem.question}</h6>
              <h4 onClick={() => handleDeleteModalOpen(surveyItem.id)}>
                <FiDelete />
              </h4>
            </div>
           
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
              <label htmlFor="titleInput">Question</label>
              <textarea
                className="form-control"
                rows="5"
                id="titleInput"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
  );
};

export default Survey;
