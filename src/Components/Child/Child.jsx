/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Updatechild } from "./Updatechild";
import './Child.css'
export const Child = () => {
  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState(null);
  const [show, setShow] = useState(false);

  const parentId = localStorage.getItem("userId");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const childEditHandler = (chId) => {
    setChildId(chId);
    handleShow();
  };

  const fetchChilddata = () => {
    fetch(`http://139.59.68.139:3000/admin-getChildByUserId/${parentId}`)
      .then((response) => response.json())
      .then((data) => {
        setChildData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const childDeleteHandler = async (chId) => {
    try {
      const response = await fetch(
        `http://139.59.68.139:3000/admin-deleteChildByChildId/${chId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log(response);
        fetchChilddata();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-getChildByUserId/1")
      .then((response) => response.json())
      .then((data) => {
        setChildData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Updatechild show={show} handleClose={handleClose} childId={childId} />
      <div className="container mt-5">
        <h2>Child Management</h2>
      <div><p className="welcome-text-child">Welcome to Child Management !</p></div>
      <div><p className="welcome-text-child2">Here You can manage users child </p></div>
        {childData.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Child Name</th>
                <th>Nickname</th>
                <th>Relation</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Age</th>
                <th>Questions</th>
                <th>Image</th>
                <th>Enrollment date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {childData.map((ch) => (
                <tr key={ch.id}>
                  <td>{ch.id}</td>
                  <td>{ch.name}</td>
                  <td>{ch.nickname}</td>
                  <td>{ch.relation}</td>
                  <td>{ch.gender}</td>
                  <td>{ch.dob.substring(0, 10)}</td>

                  <td>{ch.age}</td>
                  <td>{ch.set_of_questions}</td>
                  <td><img src={`http://139.59.68.139:3000/uploads/${ch.image}`} alt="" /></td>
                  <td>{ch.createdAt.substring(0,10)}</td>
                  <td>
                    {<AiOutlineEdit onClick={() => childEditHandler(ch.id)} />} 
                  </td>
                  <td>
                    {
                      <AiOutlineDelete
                        onClick={() => childDeleteHandler(ch.id)}
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
