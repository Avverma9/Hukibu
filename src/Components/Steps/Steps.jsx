import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Updatestep } from "./Updatestep";

export const Steps = () => {
    const [stepData, setStepData] = useState([]);
    
      const [stepId, setStepId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stepEditHandler = (Id) => {
    setStepId(Id);
    handleShow();
  };


  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-allsteps")
      .then((response) => response.json())
      .then((data) => {
        setStepData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
    
    const fetchStepdata = () => {
         fetch("http://139.59.68.139:3000/admin-allsteps")
           .then((response) => response.json())
           .then((data) => {
             setStepData(data);
           })
           .catch((error) => console.error("Error fetching data:", error));
    }

    const stepDeleteHandler = async (id) => {
         try {
           const response = await fetch(
             `http://139.59.68.139:3000/admin-deletestepsById/${id}`,
             {
               method: "GET",
             }
           );

           if (response.ok) {
             console.log(response);
             fetchStepdata();
             alert("data deleted")
           }
         } catch (error) {
           console.log("Error:", error);
         }
    }

    return (
      <>
        <Updatestep show={show} handleClose={handleClose} stepId={stepId} />

        <div className="container mt-5">
        <div><p className="welcome-text-user">Welcome to Steps !</p></div>
      <div><p className="welcome-text-user2">Here You can manage steps ...</p></div>
          <h2 className="mb-3">Steps Data</h2>
          <button style={{ backgroundColor: "black", textDecoration: "none" }}>
  <a href="/add-steps" style={{ textDecoration: "none", color: "white" }}>
    Add Steps
  </a>
</button>

          {stepData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Activity Id</th>
                  <th>Title</th>
                  <th>Step Description</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {stepData.map((ch) => (
                  <tr key={ch.id}>
                    <td>{ch.id}</td>
                    <td>{ch.activity_id}</td>
                    <td>{ch.title}</td>
                    <td>{ch.step_description}</td>
                    <td><img src={`http://139.59.68.139:3000/uploads/${ch.image}`} alt={ch.image} /></td>

                    <td>
                      {<AiOutlineEdit onClick={() => stepEditHandler(ch.id)} />}
                    </td>
                    <td>
                      {
                        <AiOutlineDelete
                          onClick={() => stepDeleteHandler(ch.id)}
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
