import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Updatestep = ({ show, handleClose, stepId }) => {
  const [activityId, setActivityId] = useState("");
  const [stepDesc, setStepDesc] = useState("");
  const [stepData, setStepData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://13.127.11.171:3000/admin-getstepsById/${stepId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStepData(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(setLoading(false));
  }, [stepId]);

  const updateStepHandler = async (e) => {
    e.preventDefault();

    // Create FormData object to send the form data
    const formData = new FormData();
    formData.append("activityId", activityId);
    formData.append("stepDesc", stepDesc);

    try {
      const response = await fetch(
        `http://13.127.11.171:3000/admin-updatesteps/${stepId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(response);
        // Reset form fields
        setActivityId("");
        setStepDesc("");
        handleClose();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Step Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Activity Id</Form.Label>
          </Form.Group>
          <Form.Control
            type="text"
            value={
              !isLoading && stepData.length !== 0
                ? stepData[0].activity_id
                : activityId
            }
            onChange={(e) => setActivityId(e.target.value)}
          />
          <Form.Group>
            <Form.Label>Step Description</Form.Label>
            <Form.Control
              type="text"
              value={
                !isLoading && stepData.length !== 0
                  ? stepData[0].step_description
                  : stepDesc
              }
              onChange={(e) => setStepDesc(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateStepHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
