import React, { useEffect, useState } from "react";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Editinstructor } from "./Editinstructor";

export const Instructor = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [instId, setInstId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const instEditHandler = (instId) => {
    setInstId(instId);
    handleShow();
  };

  useEffect(() => {
    fetch("http://13.235.242.110:3000/admin-allinstructor")
      .then((response) => response.json())
      .then((data) => {
        setInstructorData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchInstructor = () => {
    fetch("http://13.235.242.110:3000/admin-allinstructor")
      .then((response) => response.json())
      .then((data) => {
        setInstructorData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const viewInstructorHandler = (Instid) => {
    fetch(`http://13.235.242.110:3000/admin-getinstructorById/${Instid}`)
      .then((response) => response.json())
      .then((data) => {
        setInstructorData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteInstructorHandler = async (Id) => {
    try {
      const response = await fetch(
        `http://13.235.242.110:3000/admin-deleteinstructorById/${Id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        fetchInstructor();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Editinstructor show={show} handleClose={handleClose} instId={instId} />
      <div className="container mt-5">
      <div><p className="welcome-text-user">Welcome to Instructor Page !</p></div>
      <div><p className="welcome-text-user2">Here You can manage Instructor data</p></div>
      <button style={{ backgroundColor: "black", textDecoration: "none" }}>
  <a href="/add-instructor" style={{ textDecoration: "none", color: "white" }}>
    Add Instructor
  </a>
</button>
        <h2 className="mb-3">Instructors</h2>
        {instructorData.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Occupation</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {instructorData.map((ch) => (
                <tr key={ch.id}>
                  <td>{ch.course_id}</td>
                  <td>{ch.name}</td>
                  <td>{ch.description}</td>
                  <td>
                    <img src={`http://13.235.242.110:3000/uploads/${ch.image}`} alt={ch.image} />
                  </td>
                  <td>{ch.occupation}</td>
                  <td>
                    <AiFillEye onClick={() => viewInstructorHandler(ch.id)} />
                  </td>
                  <td>
                    {<AiOutlineEdit onClick={() => instEditHandler(ch.id)} />}
                  </td>
                  <td>
                    {
                      <AiOutlineDelete
                        onClick={() => deleteInstructorHandler(ch.id)}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};
