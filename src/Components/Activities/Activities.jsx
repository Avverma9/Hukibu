import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai'
import { Modal, Button, Form } from 'react-bootstrap';
const Activities = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null); 
  const [newActivity, setNewActivity] = useState({
    name: '',
    time_duration: '',
    activityImage: null
  });

  useEffect(() => {
    fetch('http://13.127.11.171:3000/allActivity')
      .then(response => response.json())
      .then(data => {
        setActivitiesData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddActivity = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewActivity({
      name: '',
      time_duration: '',
      activityImage: null
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewActivity(prevActivity => ({
      ...prevActivity,
      [name]: value
    }));
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    setNewActivity(prevActivity => ({
      ...prevActivity,
      activityImage: file
    }));
  };

  const handleDeleteModalOpen = (id) => {
    setActivityToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setActivityToDelete(null);
  };

  // Add 
  const handleAddActivitySubmit = async event => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newActivity.name);
    formData.append('time_duration', newActivity.time_duration);
    formData.append('activityImage', newActivity.activityImage);

    try {
      const response = await fetch('http://13.127.11.171:3000/admin-addActivity', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newData = await response.json();
        setActivitiesData(prevData => [...prevData, newData]);
        handleCloseModal();
        window.location.reload('/activities')
        
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  //Delete 
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://13.127.11.171:3000/admin-deleteActivityById/${activityToDelete}`, {
        method: 'GET',
      });

      if (response.ok) {
        const updatedActivities = activitiesData.filter(activity => activity.id !== activityToDelete);
        setActivitiesData(updatedActivities);
        handleDeleteModalClose();
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };


  return (
    <div className="container mt-5">
      <div><p className="welcome-text-user">Welcome to Activites !</p></div>
      <div><p className="welcome-text-user2">Here You can manage users Activity ...</p></div>
      <h2 className="mb-3">Activities</h2>
      <button onClick={handleAddActivity}>Add Activity</button>
      {activitiesData.length > 0 ? (
             <table className="table table-bordered">
             <thead>
               <tr>
                 <th>ID</th>
                 <th>Images</th>
                 <th>Name</th>
                 <th>Time Duration</th>
                 <th>View</th>
                 <th>Delete</th>
               </tr>
             </thead>
             <tbody>
               {activitiesData.map(activities => (
                 <tr key={activities.id}>
                   <td>{activities.id}</td>
                   <td>{activities.name}</td>
                   <td>
                     <img
                       src={activities.images}
                       alt={`Activity ${activities.id} Thumbnail`}
                     />
                   </td>
                   <td>{activities.time_duration}</td>
                   <td>
                     <Link to={`/activities/${activities.id}`}>
                       <BiShow />
                     </Link>
                   </td>
                   <td>
                  <AiOutlineDelete onClick={() => handleDeleteModalOpen(activities.id)} />
                </td>
                 </tr>
               ))}
             </tbody>
           </table>
      ) : (
        <p>No activities data available</p>
      )}
        

        {/* //Add Modal  */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddActivitySubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time Duration</Form.Label>
              <Form.Control
                type="text"
                name="time_duration"
                value={newActivity.time_duration}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activity Image</Form.Label>
              <Form.Control
                type="file"
                name="activityImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal  */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this activity?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Activities;