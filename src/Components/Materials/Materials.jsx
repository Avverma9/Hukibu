import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TbArrowBackUp } from "react-icons/tb";
import { BiShow } from "react-icons/bi";
import { VscAdd } from "react-icons/vsc";
import "./Materials.css";
const Materials = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [activity_id, setActivity_id] = useState("");
  const [material_name, setMaterial_name] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const Back = () => {
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://139.59.68.139:3000/admin-addmaterials",
      {
        activity_id,
        material_name,
      }
    );
    if (response.data) {
      window.location.reload();
    }
  };

  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-allmaterials")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this material ?"
    );
    if (confirmed) {
      const response = await fetch(
        `http://139.59.68.139:3000/admin-deletematerialsById/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        alert("Successfully deleted");
        const newData = data.filter((instructor) => instructor.id !== id);
        setData(newData);
      }
    }
  };
  const getById = async (id) => {
    const res = await fetch(
      `http://139.59.68.139:3000/admin-getmaterialsById/${id}`
    );
    const data = await res.json();
    setData(data);
  };

  return (
    <div>
   
       <div>
        <button className="backarrow-btn-material" onClick={Back}>
          <TbArrowBackUp />Refresh
        </button>
         </div>
         <br />
     <div>
        <button
          className="add-btn-material"
          onClick={() => setShowAddForm(true)}
        >
          <VscAdd />Add More
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Activity Id"
            value={activity_id}
            placeholder="Activity Id"
            onChange={(e) => setActivity_id(e.target.value)}
          />
          <input
            type="text"
            name="material"
            value={material_name}
            placeholder="Material name"
            onChange={(e) => setMaterial_name(e.target.value)}
          />
          <div>
          <button type="submit">Submit</button></div>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Material ID</th>
            <th>Activity ID</th>
            <th>Material Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.activity_id}</td>
              <td>{e.material_name}</td>
              <td>
                <button className="show-btn" onClick={() => getById(e.id)}>
                  <BiShow />
                </button>

                <button className="dlit-btn" onClick={() => handleDelete(e.id)}>
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Materials;
