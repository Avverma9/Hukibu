/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';


const User = () => {
    const [userData, setUserData] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://13.127.11.171:3000/admin-getUser')
            .then(response => response.json())
            .then(data => {
                setUserData(data.data);
                console.log(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEditModalOpen = (user) => {
        const userId = localStorage.setItem("userId", user.id)
        setEditData(user);
        setEditModalShow(true);
    };

    const handleEditModalClose = () => {
        setEditModalShow(false);
        setEditData({});
    };

    const handleEditSubmit = async () => {
        const id = localStorage.getItem("userId");
        setLoading(true);

        try {
            const response = await fetch(`http://13.127.11.171:3000/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editData.name,
                    mobile: editData.mobile,
                    age: editData.age,
                    relation: editData.relation,
                    gender: editData.gender,
                    area: editData.area,
                    education: editData.education,
                    vocation: editData.vocation
                })
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                setUserData(prevUserData => {
                    return prevUserData.map(user => user.id === id ? responseData.updatedUser : user);
                  });
            
                toast.success('User data updated successfully');
            } else {
                toast.error('Error updating user data');
            }

            setLoading(false);
            handleEditModalClose();
        } catch (error) {
            console.error('Error updating data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">User Data</h2>
            {userData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name || 'N/A'}</td>
                                <td>{user.mobile}</td>
                                <td>{user.email || 'N/A'}</td>
                                <td><AiOutlineEdit onClick={() => handleEditModalOpen(user)} /></td>
                                <td><AiOutlineDelete /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}

            <Modal show={editModalShow} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.name || ''}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.mobile || ''}
                                onChange={e => setEditData({ ...editData, mobile: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={editData.age || ''}
                                onChange={e => setEditData({ ...editData, age: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Relation</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.relation || ''}
                                onChange={e => setEditData({ ...editData, relation: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.gender || ''}
                                onChange={e => setEditData({ ...editData, gender: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.area || ''}
                                onChange={e => setEditData({ ...editData, area: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Education</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.education || ''}
                                onChange={e => setEditData({ ...editData, education: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Vocation</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.vocation || ''}
                                onChange={e => setEditData({ ...editData, vocation: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default User;
