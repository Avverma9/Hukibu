import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Updatechild = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Child Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Child name"
          />
          <br />
          <label htmlFor="nickname">Nickname</label>
          <br />
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Enter Child Nick Name"
          />
          <br />
          <label htmlFor="relation">Relation</label>
          <br />
          <input type="text" name="relation" id="relation" />
          <br />
          <label htmlFor="gender">Gender</label>
          <br />
          <input type="text" name="gender" id="gender" />
          <br />
          <label htmlFor="dob">DOB</label>
          <br />
          <input type="text" name="dob" id="dob" />
          <br />
          <label htmlFor="age">Age</label>
          <br />
          <input type="text" name="age" id="age" />
          <br />
          <label htmlFor="questions">Questions</label>
          <br />
          <input type="text" name="questions" id="questions" />
          <br />
          <br />
          <input type="submit" defaultValue="Submit" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
