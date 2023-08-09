import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Updatechild = ({ show, handleClose, childId }) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [relation, setRelation] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [questions, setQuestions] = useState("");

  const updateChildHandler = async (e) => {
    e.preventDefault();

    // Create FormData object to send the form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nickname", nickname);
    formData.append("relation", relation);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("questions", questions);

    try {
      const response = await fetch(
        `http://13.127.11.171:3000/admin-updateChild/${childId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(response);
        // Reset form fields
        setName("");
        setNickname("");
        setRelation("");
        setGender("");
        setDob("");
        setAge("");
        setQuestions("");
        handleClose();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Child Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
          </Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Child name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Group>
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Child Nick Name"
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Relation</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRelation(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Questions</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setQuestions(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateChildHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
