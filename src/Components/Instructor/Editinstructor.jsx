import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Editinstructor = ({ show, handleClose, instId }) => {
  const [instructor, setInstructor] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://13.127.11.171:3000/admin-getinstructorById/${instId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInstructor(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(setLoading(false));
  }, [instId]);
  console.log(instructor);
  const updateInstructorHandler = async (e) => {
    e.preventDefault();

    // Create FormData object to send the form data
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("occupation", occupation);
    formData.append("image", image);

    try {
      const response = await fetch(
        `http://13.127.11.171:3000/admin-updateinstructor/${instId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(response);
        // Reset form fields
        setCourseId();
        setName("");
        setDescription("");
        setOccupation("");
        setImage("");
        handleClose();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Instructor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Course Id</Form.Label>
          </Form.Group>
          <Form.Control
            type="text"
            value={
              !isLoading && instructor.length !== 0
                ? instructor[0].course_id
                : courseId
            }
            onChange={(e) => setCourseId(e.target.value)}
          />
          <Form.Group>
            <Form.Label>Name</Form.Label>
          </Form.Group>
          <Form.Control
            type="text"
            value={
              !isLoading && instructor.length !== 0 ? instructor[0].name : name
            }
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={
                !isLoading && instructor.length !== 0
                  ? instructor[0].description
                  : description
              }
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              value={
                !isLoading && instructor.length !== 0
                  ? instructor[0].occupation
                  : occupation
              }
              onChange={(e) => setOccupation(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              value={
                !isLoading && instructor.length !== 0
                  ? instructor[0].image
                  : image
              }
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateInstructorHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
