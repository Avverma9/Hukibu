/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { BiShow } from "react-icons/bi";
import "./User.css";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [detailedUser, setDetailedUser] = useState(null);
  const [detailModalShow, setDetailModalShow] = useState(false);

  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-getUser")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
        console.log(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEditModalOpen = (user) => {
    const userId = localStorage.setItem("userId", user.id);
    setEditData(user);
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

  const handleViewModalOpen = async (userId) => {
    try {
      const response = await fetch(
        `http://139.59.68.139:3000/getUserById/${userId}`
      );
      const userData = await response.json();

      if (response.ok && userData.success) {
        setDetailedUser(userData.data);
        setDetailModalShow(true);
      } else {
        toast.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditSubmit = async () => {
    const id = localStorage.getItem("userId");
    setLoading(true);

    try {
      const response = await fetch(`http://139.59.68.139:3000/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.name,
          mobile: editData.mobile,
          age: editData.age,
          relation: editData.relation,
          gender: editData.gender,
          area: editData.area,
          education: editData.education,
          vocation: editData.vocation,
        }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        window.location.reload("/user");

        setUserData((prevUserData) => {
          return prevUserData.map((user) =>
            user.id === id ? responseData.updatedUser : user
          );
        });

        toast.success("User data updated successfully");
      } else {
        toast.error("Error updating user data");
      }

      setLoading(false);
      handleEditModalClose();
      window.location.reload("/user");
    } catch (error) {
      console.error("Error updating data:", error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://139.59.68.139:3000/admin-deleteUserById/${deleteUserId}`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setUserData((prevUserData) =>
          prevUserData.filter((user) => user.id !== deleteUserId)
        );

        alert("User deleted successfully");
      } else {
        toast.error("Error deleting user");
      }

      setLoading(false);
      handleDeleteModalClose();
      window.location.reload("/user");
    } catch (error) {
      console.error("Error deleting user:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <p className="welcome-text-user">Welcome to Users Management</p>
      </div>
      <div>
        <p className="welcome-text-user2">Here You can manage users</p>
      </div>
      <h2 className="mb-3">User Management</h2>
      {userData.length > 0 ? (
        <div className="row">
          {userData.map((user) => (
            <div key={user.id} className="col-md-4 mb-3">
              <div className="user-card">
                <h3>{user.name || "N/A"}</h3>
                <p>
                  <strong>Mobile:</strong> {user.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || "N/A"}
                </p>
                <img
                  src={`http://139.59.68.139:3000/uploads/${user.image}`}
                  alt=""
                />
                <div className="user-actions">
                  <button onClick={() => handleEditModalOpen(user)}>
                    <AiOutlineEdit /> View & update
                  </button>
                  <button onClick={() => handleDeleteModalOpen(user.id)}>
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
      {/* edit  */}
      <Modal
        show={editModalShow}
        onHide={handleEditModalClose}
        className="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Only Characters Allowed"
                maxLength={15}
                value={editData.name || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyCharacters = inputValue.replace(/[^A-Za-z\s]/g, "");
                  setEditData({ ...editData, name: onlyCharacters });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                value={editData.mobile || ""}
                onChange={(e) => {
                  let inputValue = e.target.value;
                  inputValue = inputValue.slice(0, 13);
                  const onlyNumericals = inputValue.replace(/\D/g, "");
                  setEditData({ ...editData, mobile: onlyNumericals });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={editData.age || ""}
                onChange={(e) =>
                  setEditData({ ...editData, age: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dad/Mom</Form.Label>
              <Form.Control
                type="text"
                value={editData.relation || ""}
                onChange={(e) =>
                  setEditData({ ...editData, relation: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={editData.gender || ""}
                onChange={(e) =>
                  setEditData({ ...editData, gender: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area of Interest</Form.Label>
              <Form.Control
                type="text"
                value={editData.area || ""}
                onChange={(e) =>
                  setEditData({ ...editData, area: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Education Level</Form.Label>
              <Form.Control
                type="text"
                value={editData.education || ""}
                onChange={(e) =>
                  setEditData({ ...editData, education: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vocation</Form.Label>
              <Form.Control
                type="text"
                value={editData.vocation || ""}
                onChange={(e) =>
                  setEditData({ ...editData, vocation: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleEditSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* //delete */}
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
          <Button
            variant="danger"
            onClick={handleDeleteUser}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* view  */}
      <Modal show={detailModalShow} onHide={() => setDetailModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailedUser && (
            <div>
              <p>ID: {detailedUser.id}</p>
              <p>Name: {detailedUser.name}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDetailModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
