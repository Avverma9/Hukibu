/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { BiShow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button,Spinner,Form } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const GetCourses = () => {
    const [courseData, setCourseData] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false); 
    const [courseDetails, setCourseDetails] = useState(null);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState({});
    const [editModalShow, setEditModalShow] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);


    const [newCourse, setNewCourse] = useState({});

   

    useEffect(() => {
        fetch('http://13.127.11.171:3000/courses/all')
            .then(response => response.json())
            .then(data => {
                setCourseData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openModal = async courseId => {
        setSelectedCourseId(courseId);
        try {
            const response = await fetch(`http://13.127.11.171:3000/courses/get/${courseId}`);
            const data = await response.json();
            setCourseDetails(data.course);
            setViewModalVisible(true); 
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };
    const openAddModal = () => {
        setAddModalVisible(true);
    };

    const closeAddModal = () => {
        setAddModalVisible(false);
        setNewCourse({
            courseName: '',
            courseDesc: '',
            price: '',
            whatYouGet: '',
            image: null
        });
    };

    const closeModal = () => {
        setViewModalVisible(false);
        setCourseDetails(null);
    };

    const handleEditModalOpen = (course) => {
        setEditData(course);
        setEditModalShow(true);
    };

    const handleEditModalClose = () => {
        setEditModalShow(false);
        setEditData({});
    };


    const handleDeleteModalOpen = (userId) => {
        setDeleteUserId(userId);
        setDeleteModalShow(true);
    };

    const handleDeleteModalClose = () => {
        setDeleteUserId(null);
        setDeleteModalShow(false);
    };

     //add course 
     const handleAddCourseSubmit = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('courseName', newCourse.courseName);
            formData.append('courseDesc', newCourse.courseDesc);
            formData.append('price', newCourse.price);
            formData.append('whatYouGet', newCourse.whatYouGet);
            formData.append('image', newCourse.image);

            const response = await fetch('http://13.127.11.171:3000/admin-addCourse', {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                toast.success('Course added successfully');
                setCourseData(prevCourseData => [...prevCourseData, responseData.newCourse]);
                window.location.reload("/get-courses")
            } else {
                toast.error('Error adding course');
            }

            setLoading(false);
            closeModal();
        } catch (error) {
            console.error('Error adding course:', error);
            setLoading(false);
        }
    };

     //edit
     const handleEditSubmit = async () => {
        setLoading(true);
    
        try {
            const response = await fetch(`http://13.127.11.171:3000/admin-updateCourse/${editData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseName: editData.courseName,
                    courseDesc: editData.courseDesc,
                    price: editData.price,
                    whatYouGet: editData.whatYouGet,
                    // image: editData.image,
                })
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.success) {
                setCourseData(prevCourseData => {
                    return prevCourseData.map(course => course.id === editData.id ? responseData.updatedCourse : course);
                });
    
                toast.success('Course data updated successfully');
            } else {
                toast.error('Error updating course data');
            }
    
            setLoading(false);
            handleEditModalClose();
            window.location.reload("/get-courses")
        } catch (error) {
            console.error('Error updating data:', error);
            setLoading(false);
        }
    };

    // delete 
    const handleDeleteUser = async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://13.127.11.171:3000/admin-deleteCourseById/${deleteUserId}`, {
                method: 'GET'
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                setCourseData(prevUserData => prevUserData.filter(user => user.id !== deleteUserId));
                toast.success('User deleted successfully');
            } else {
                toast.error('Error deleting user');
            }

            setLoading(false);
            handleDeleteModalClose();
            window.location.reload("/activities")
        } catch (error) {
            console.error('Error deleting user:', error);
            setLoading(false);
        }
    };



    return (
        <div className="container mt-5">
                  <div><p className="welcome-text-user">Welcome to Courses!</p></div>
      <div><p className="welcome-text-user2">Here You can manage your courses</p></div>
            <h2 className="mb-3">Course Data</h2>
            <button onClick={openAddModal}>Add Course</button>

            {courseData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Course Description</th>
                            <th>Price</th>
                            <th>Images</th>
                            <th>What You Get</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map(course => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.courseName}</td>
                                <td>{course.courseDesc}</td>
                                <td>{course.price}</td>
                                <td><img src={course.images} alt={`Course ${course.id} Thumbnail`} /></td>
                                <td>{course.whatYouGet}</td>
                                <td><BiShow onClick={() => openModal(course.id)} /></td>
                                <td>{<AiOutlineEdit onClick={() => handleEditModalOpen(course)} />}</td>
                                <td><AiOutlineDelete onClick={() => handleDeleteModalOpen(course.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No course data available</p>
            )}

            {/* Add-course  */}
            <Modal show={addModalVisible} onHide={closeAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourse.courseName}
                                onChange={e => setNewCourse({ ...newCourse, courseName: e.target.value })}
                            />
                        </Form.Group>
                       
                        <Form.Group>
                            <Form.Label>Course Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourse.courseDesc}
                                onChange={e => setNewCourse({ ...newCourse, courseDesc: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourse.price}
                                onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>What you Get</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourse.whatYouGet}
                                onChange={e => setNewCourse({ ...newCourse, whatYouGet: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => setNewCourse({ ...newCourse, image: e.target.files[0] })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCourseSubmit} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Add Course'}
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* view  */}
            <Modal show={viewModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {courseDetails && (
                        <div>
                            <p>ID: {courseDetails.id}</p>
                            <p>Course Name: {courseDetails.courseName}</p>
                            <p>Course Description: {courseDetails.courseDesc}</p>
                            <p>Price: {courseDetails.price}</p>
                            <p>Images: <img src={courseDetails.images} alt={`Course ${courseDetails.id} Thumbnail`} /></p>
                            <p>What You Get: {courseDetails.whatYouGet}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Delete  */}
            <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* edit  */}
            <Modal show={editModalShow} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.courseName || ''}
                                onChange={e => setEditData({ ...editData, courseName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Course Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.courseDesc || ''}
                                onChange={e => setEditData({ ...editData, courseDesc: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={editData.price || ''}
                                onChange={e => setEditData({ ...editData, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>What you Get</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.whatYouGet || ''}
                                onChange={e => setEditData({ ...editData, whatYouGet: e.target.value })}
                            />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                value={editData.image || ''}
                                onChange={e => setEditData({ ...editData, image: e.target.value })}
                            />
                        </Form.Group> */}
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
};

export default GetCourses;
