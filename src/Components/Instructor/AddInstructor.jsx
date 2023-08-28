import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {TbArrowBackUp} from 'react-icons/tb';
import {FaLocationArrow} from 'react-icons/fa';
const AddInstructor = () => {
    const navigate=useNavigate()
  const [course_id, setCourse] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [image, setImage] = useState(null); // Change to null


  const Back=()=>{
    navigate(-1)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("occupation", occupation);
    formData.append("image", image); // Append the image file object

    try {
      const response = await fetch("http://139.59.68.139:3000/admin-addinstructor", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data has been created");
        window.location.reload()
      } else {
        console.error("Failed to create data");
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return (
    <>
    <button className="backarrow-btn" onClick={Back}><TbArrowBackUp/></button>
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={course_id}
        placeholder="Enter Course ID"
        onChange={(e) => setCourse(e.target.value)}
      />
      <input
        type="text"
        value={name}
        placeholder="Name of instructor"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Upload Instructor Image</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Use files[0] for file input
      />
      <input
        type="text"
        value={description}
        placeholder="Enter details"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        value={occupation}
        placeholder="Enter Occuption"
        onChange={(e) => setOccupation(e.target.value)}
      />
      <button className="submit-btn" type="submit"><FaLocationArrow/></button>
    </form>
    </>
  );
};

export default AddInstructor;
