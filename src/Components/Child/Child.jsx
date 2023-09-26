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
      const confirmed = window.confirm("Are sure you want to delete this child ?")
      if(confirmed){
      const response = await fetch(
        `http://139.59.68.139:3000/admin-deleteChildByChildId/${chId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log(response);
        fetchChilddata();
      }  }
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
        <div className="row">
          {childData.length > 0 ? (
            childData.map((ch) => (
              <div className="col-md-4 mb-4" key={ch.id}>
                <div className="card">
                  <img
                    src={`http://139.59.68.139:3000/uploads/${ch.image}`}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">Child Name: {ch.name}</h5>
                    <p className="card-text">Nickname: {ch.nickname}</p>
                    <p className="card-text">Relation: {ch.relation}</p>
                    <p className="card-text">Gender: {ch.gender}</p>
                    <p className="card-text">DOB: {ch.dob.substring(0, 10)}</p>
                    <p className="card-text">Age: {ch.age}</p>
                    <p className="card-text">Questions: {ch.set_of_questions}</p>
                    <p className="card-text">Enrollment date: {ch.createdAt.substring(0, 10)}</p>
                    <div className="d-flex justify-content-between">
                      <AiOutlineEdit onClick={() => childEditHandler(ch.id)} />
                      <AiOutlineDelete onClick={() => childDeleteHandler(ch.id)} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};
