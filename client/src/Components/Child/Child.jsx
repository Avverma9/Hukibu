import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export const Child = () => {
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    fetch("http://13.127.11.171:3000/admin-getChildByUserId/1")
      .then((response) => response.json())
      .then((data) => {
        setChildData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
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
                <td>{<AiOutlineEdit />}</td>
                <td>{<AiOutlineDelete />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
