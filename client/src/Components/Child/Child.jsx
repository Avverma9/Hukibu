import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Updatechild } from "./Updatechild";

export const Child = () => {
  const [childData, setChildData] = useState([]);
  const [childId, setChildId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const childEditHandler = (chId) => {
    setChildId(chId);
    handleShow();
  };

  const fetchChilddata = () => {
    fetch("http://13.127.11.171:3000/admin-getChildByUserId/1")
      .then((response) => response.json())
      .then((data) => {
        setChildData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const childDeleteHandler = async (chId) => {
    try {
      const response = await fetch(
        `http://13.127.11.171:3000/admin-deleteChildByChildId/${chId}`,
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
    fetch("http://13.127.11.171:3000/admin-getChildByUserId/1")
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
        <h2 className="mb-3">User Data</h2>
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
                <th>Created on</th>
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
                  <td>{ch.dob}</td>
                  <td>{ch.age}</td>
                  <td>{ch.set_of_questions}</td>
                  <td>{ch.image}</td>
                  <td>{ch.createdAt}</td>
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
