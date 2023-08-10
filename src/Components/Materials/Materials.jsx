import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';

const Materials = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMaterials, setNewMaterials] = useState({
    material_name: '',
    activity_id: '',
  });
  const [selectedMaterialId, setSelectedMaterialId] = useState(null); 
  const [fetchedMaterialData, setFetchedMaterialData] = useState(""); 
  useEffect(() => {
    fetch('http://13.127.11.171:3000/admin-allmaterials')
      .then(response => response.json())
      .then(data => {
        setMaterialsData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchMaterialDataById = async (id) => {
    try {
      const response = await fetch(`http://13.127.11.171:3000/admin-getmaterialsById/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Material Data:', data);
        setFetchedMaterialData(data); // Store fetched data in state
        setShowModal(true); // Open the modal
      } else {
        console.error('Failed to fetch material data');
      }
    } catch (error) {
      console.error('Error fetching material data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://13.127.11.171:3000/admin-deletematerialsById/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log(response);
        window.location.reload("/materials")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleAddMaterials = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMaterials({
      material_name: '',
      activity_id: '',
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewMaterials(prevMaterials => ({
      ...prevMaterials,
      [name]: value
    }));
  };

  const handleAddMaterialsSubmit = async event => {
    event.preventDefault();
  
    const requestData = {
      material_name: newMaterials.material_name,
      activity_id: newMaterials.activity_id,
    };
  
    try {
      const response = await fetch('http://13.127.11.171:3000/admin-addmaterials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestData), // Convert data to JSON format
      });
  
      if (response.ok) {
        const newData = await response.json();
        setMaterialsData(prevData => [...prevData, newData]);
        handleCloseModal();
        window.location.reload("/materials")
      }
    } catch (error) {
      console.error('Error adding Materials:', error);
    }
  };
 
  return (
    <div className="container mt-5">
            <div><p className="welcome-text-user">Welcome to Materials</p></div>
      <div><p className="welcome-text-user2">Here You can manage your materials</p></div>
      <h2 className="mb-3">Materials</h2>
      <button onClick={handleAddMaterials}>Add Materials</button>
      {materialsData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Activity ID</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {materialsData.map(material => (
              <tr key={material.id}>
                <td>{material.id}</td>
                <td>{material.material_name}</td>
                <td>{material.activity_id}</td>
                <td>
                <Link to={`/materials/${material.id}`}>
                    <BiShow onClick={() => fetchMaterialDataById(material.id)} />
                  </Link>
                </td>
                <td>
                    {
                      <AiOutlineDelete
                        onClick={() => handleDelete(material.id)}
                      />
                    }
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No materials data available</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMaterialsSubmit}>
            <Form.Group>
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                name="material_name"
                value={newMaterials.material_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activity ID</Form.Label>
              <Form.Control
                type="text"
                name="activity_id"
                value={newMaterials.activity_id}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Materials;
