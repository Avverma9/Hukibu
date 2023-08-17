/* eslint-disable no-unused-vars */
import './getCourses.css';
import { useState, useEffect } from 'react';
import { BiShow } from 'react-icons/bi';
import { Modal, Button } from 'react-bootstrap';

const GetCourses = () => {
    const [courseData, setCourseData] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);

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
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCourseDetails(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Course Data</h2>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No course data available</p>
            )}

            <Modal show={modalVisible} onHide={closeModal}>
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
        </div>
    );
};

export default GetCourses;
