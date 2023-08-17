import React, { useState, useEffect } from 'react';
import styles from "./Contents.module.css";
import { FiDelete } from "react-icons/fi";
import { Modal, Button } from 'react-bootstrap';

const Contents = () => {
  const [contents, setContents] = useState([]);
  const [isAddTagsModalOpen, setIsAddTagsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newTags, setNewTags] = useState({ tags: '', title: '', description: '' });
  const [deletingContentId, setDeletingContentId] = useState(null);
  const [showAllContents, setShowAllContents] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ tags: '', title: '', description: '' });
  const [newContent, setNewContent] = useState({ tags: '', title: '', description: '' });

  useEffect(() => {
    fetch('https://hukibu.onrender.com/get/content')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('contents', JSON.stringify(data));
        setContents(data);
      })
      .catch((error) => console.error('Error fetching contents:', error));
  }, []);

  const handleAddTagsClick = () => {
    setIsAddTagsModalOpen(true);
  };

  const handleRemoveTagsClick = (contentId) => {
    setDeletingContentId(contentId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTagsModalOpen(false);
    setIsAddTaskModalOpen(false);
    setIsDeleteModalOpen(false);
    setNewTags({ tags: '', title: '', description: '' });
    setNewTask({ tags: '', title: '', description: '' });
  };

  const handleAddTagsSubmit = () => {
    fetch('https://hukibu.onrender.com/create/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTags), // Use newTags instead of newContent
    })
      .then((response) => response.json())
      .then((data) => {
        setContents(data);
      })
      .catch((error) => console.error('Error adding tags:', error));

    handleCloseModal();
  };


  const handleRemoveTagsConfirmation = () => {
    setIsDeleteModalOpen(false);

    fetch(`https://hukibu.onrender.com/delete/content/${deletingContentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContents(data);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((error) => console.error('Error deleting content:', error));

    setDeletingContentId(null);
  };


  const handleRemoveTagsCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingContentId(null);
  };

  const handleSeeMoreClick = () => {
    setShowAllContents(true);
  };

  const handleAddTaskClick = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setNewTask({ tags: '', title: '', description: '' });
  };

  const handleAddTaskSubmit = () => {
    fetch('https://hukibu.onrender.com/create/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setContents(data);
      })
      .catch((error) => console.error('Error adding task:', error));

    handleCloseTaskModal();
  };

  return (
    <div>
      <h2 className={styles.h2title}>Contents</h2>
      {contents.slice(0, showAllContents ? contents.length : 2).map((content) => (
        <div className={styles.main} key={content._id}>
          <div className={styles.container}>
            <div className={styles.imagediv}>
              <img
                className={styles.image}
                src={
                  content.imageSrc ||
                  'https://www.shutterstock.com/image-vector/smart-boy-character-isolated-flat-600w-2230182563.jpg'
                }
                alt="avatar"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                <h1 className={styles.tags}>{content.tags}</h1>
                <div onClick={() => handleRemoveTagsClick(content._id)}><FiDelete /></div>
              </div>
              <div>
                {content.description}
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.answerbtn} onClick={handleAddTagsClick}>
              Add Tags
            </button>
            <div style={{ marginLeft: '10px' }} />
            <button className={styles.answerbtn} onClick={() => handleRemoveTagsClick(content._id)}>
              Remove Tags
            </button>
          </div>
        </div>
      ))}

      <div className={styles.btnflex}>
        {!showAllContents && (
          <button className={styles.seemorebtn} onClick={handleSeeMoreClick}>
            See More
          </button>
        )}
        <button className={styles.seemorebtn} onClick={handleAddTaskClick}>
          Add Task
        </button>
      </div>

      {/* Add Tags Modal */}
      <Modal show={isAddTagsModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="tagsInput">Tags:</label>
              <input
                type="text"
                className="form-control"
                id="tagsInput"
                value={newTags.tags}
                onChange={(e) => setNewContent({ ...contents, tags: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="titleInput">Title:</label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...contents, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description:</label>
              <textarea
                className="form-control"
                rows="5"
                id="descriptionInput"
                value={newContent.description}
                onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTagsSubmit}>
            Add Tags
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
      <Modal show={isAddTaskModalOpen} onHide={handleCloseTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="tagsInput">Tags:</label>
              <input
                type="text"
                className="form-control"
                id="tagsInput"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="titleInput">Title:</label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description:</label>
              <textarea
                className="form-control"
                rows="5"
                id="descriptionInput"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTaskModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTaskSubmit}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
      <Modal show={isAddTagsModalOpen} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add Tags</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      <div className="form-group">
        <label htmlFor="tagsInput">Tags:</label>
        <input
          type="text"
          className="form-control"
          id="tagsInput"
          value={newTags.tags}
          onChange={(e) => setNewTags({ ...newTags, tags: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="titleInput">Title:</label>
        <input
          type="text"
          className="form-control"
          id="titleInput"
          value={newTags.title}
          onChange={(e) => setNewTags({ ...newTags, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionInput">Description:</label>
        <textarea
          className="form-control"
          rows="5"
          id="descriptionInput"
          value={newTags.description}
          onChange={(e) => setNewTags({ ...newTags, description: e.target.value })}
        />
      </div>
    </form>
    
  </Modal.Body>
  <div className='button'>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleCloseTaskModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTaskSubmit}>
            Add Task
          </Button>
        </Modal.Footer>
        </div>
        
      </Modal>
      

      <Modal show={isDeleteModalOpen} onHide={handleRemoveTagsCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove these tags?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRemoveTagsCancel}>
            No
          </Button>
          <Button variant="danger" onClick={handleRemoveTagsConfirmation}>
            Yes
          </Button>
          
        </Modal.Footer>
        
      </Modal>
      
    </div>
  );
};

export default Contents;
