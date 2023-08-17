import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {BiShow} from 'react-icons/bi';
import './Materials.css'
const Materials = () => {
  const [data, setData] = useState([]);
  const [activity_id, setActivity_id] = useState("");
  const [material_name, setMaterial_name] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://13.235.242.110:3000/admin-addmaterials", {
      activity_id,
      material_name
    });
    if (response.data) {
      window.location.reload();
    }
  };

  useEffect(() => {
    fetch('http://13.235.242.110:3000/admin-allmaterials')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://13.235.242.110:3000/admin-deletematerialsById/${id}`, {
      method: "GET"
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  const getById = async (id) => {
    const res = await fetch(`http://13.235.242.110:3000/admin-getmaterialsById/${id}`);
    const data = await res.json();
    setData(data);
  };

  return (
    <div>
      <button onClick={() => setShowAddForm(true)}>Add Material</button>
      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="Activity Id" value={activity_id} placeholder="Activity Id" onChange={(e) => setActivity_id(e.target.value)} />
          <input type="text" name="material" value={material_name} placeholder="Material name" onChange={(e) => setMaterial_name(e.target.value)} />
          <button type="submit">Submit</button>
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
                <button className="show-btn" onClick={() => getById(e.id)}><BiShow/></button>
                <button className="dlit-btn" onClick={() => handleDelete(e.id)}><AiOutlineDelete/></button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default Materials;
