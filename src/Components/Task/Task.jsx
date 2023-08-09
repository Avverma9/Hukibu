/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import style from './Task.module.css';
import { FiDelete } from 'react-icons/fi';
import { Modal, Button, Spinner } from 'react-bootstrap';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ task: '' });
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://hukibu.onrender.com/get/task')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('tasks', JSON.stringify(data));
      setTasks(data);
      setIsLoading(false); 
    })
    .catch((error) => console.error('Error fetching tasks:', error));
    setIsLoading(false); 
}, [tasks.length]);


  const handleAddTask = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false); 
    setNewTaskData({ task: '' });
  };

  const handleSubmit = () => {
    fetch('https://hukibu.onrender.com/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredTasks = data.filter((task) => task.task);
          setTasks(filteredTasks);
        } else {
          console.error('Invalid response format:', data);
        }
        handleCloseModal();
      })
      .catch((error) => console.error('Error adding new task:', error));
  };

  const handleShowMore = () => {
    setShowAllTasks(true);
  };

  const handleDeleteTask = (taskId) => {
    setDeletingTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTask = () => {
    fetch(`https://hukibu.onrender.com/delete/task/${deletingTaskId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredTasks = data.filter((task) => task.task);
          setTasks(filteredTasks);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((error) => console.error('Error deleting task:', error));
  
    setIsDeleteModalOpen(false);
    setDeletingTaskId(null);
  };
  const handleSeeLess = () => {
    setShowAllTasks(false);
  };

  return (
    <>
      <h2 className={style.h2title}>Tasks</h2>
      {isLoading ? ( 
        <Spinner animation="border" variant="primary" />
        ) : (
      tasks.slice(0, showAllTasks ? tasks.length : 5).map((task, index) => (
        <div className={style.container} key={index}>
          <div className={style.content}>
            <p>
              <span className={style.numbers}>{index + 1}.</span> {task.task}
            </p>
          </div>
          <div>
            <span>
              <FiDelete onClick={() => handleDeleteTask(task._id)} />
            </span>
          </div>
        </div>
      ))
        )}
        <div className={style.buttons}>
        {!isLoading && (showAllTasks ? (
          <button onClick={handleSeeLess}>See Less</button>
        ) : (
          <button onClick={handleShowMore}>See More</button>
        ))}
        {!isLoading && (
          <Button variant="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        )}
      </div>

      <Modal show={isAddModalOpen || isDeleteModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isDeleteModalOpen ? 'Confirm Delete Task' : 'Add New Task'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDeleteModalOpen ? (
            <p>Are you sure you want to delete this task?</p>
          ) : (
            <form>
              <div className="form-group">
                <label htmlFor="taskInput">Task:</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskInput"
                  value={newTaskData.task}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, task: e.target.value })
                  }
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDeleteModalOpen ? (
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteTask}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save changes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Task;
