import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {RxCross2} from "react-icons/rx"
import {BsFillPencilFill,BsSearch} from "react-icons/bs"
import { VscAdd } from "react-icons/vsc";
import './Instructors.css'
const Instructors = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [course_id, setCourse] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [image, setImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-allinstructor")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this instructor ?")
    if(confirmed){
    const response = await fetch(
      `http://139.59.68.139:3000/admin-deleteinstructorById/${id}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      alert("Instructor deleted");
      const newData = data.filter((instructor) => instructor.id !== id);
      setData(newData);
    }
  };
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("occupation", occupation);
    if (image) {
      formData.append("image", image);
    }
    const response = await fetch("http://139.59.68.139:3000/admin-addinstructor", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Instructor added");
      const updatedData = await response.json();
      setData([...data, updatedData]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("occupation", occupation);
    if (image) {
      formData.append("image", image);
    }
    const response = await fetch(
      `http://139.59.68.139:3000/admin-updateinstructor/${updateId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
    window.location.reload()

      const updatedData = await response.json();
      const newData = data.map((instructor) =>
        instructor.id === updateId ? updatedData : instructor
      );
      setData(newData);
      setUpdate(false);
    }
  };
const handleExit=()=>{
    window.location.reload("/new")
}
 

  return (
    <>
     <div className={`search-bar sticky-search`}>
        <input
          type="text"
          placeholder="Search by name...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
       < BsSearch/>
      </div>
    <div className="instructors-container" style={{ marginTop: "60px" }}>
      
    
    {data
  .filter((instructor) => {
    const regex = new RegExp(searchValue, 'i');
    return regex.test(instructor.name);
  })  .map((e) => (
          <div key={e.id} className="instructor-card">
               <p>{e.name}</p>
            <hr />
            <p>Course ID: {e.course_id}</p>

         <p>Instructor ID: {e.id}</p>
         
            <img
              src={`http://139.59.68.139:3000/uploads/${e.image}`}
              alt=""
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <br />
            <p>{e.description}</p>
            <hr />
            <p>{e.occupation}</p>
            <AiOutlineDelete className="delete-button" onClick={() => handleDelete(e.id)} />
            <BsFillPencilFill className="update-button" onClick={() => { setUpdateId(e.id); setUpdate(true); }}/>
              
          
          </div>
        ))}

      <button className="add-button" onClick={() => setShowAddForm(true)}>
        <VscAdd />
      </button>
      {showAddForm && (
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="course_id"
            value={course_id}
            placeholder="Enter Course Id"
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Instructor name"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            value={description}
            placeholder="About instructor"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input
            type="text"
            name="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Occupation"
          />
          <button type="submit">Submit</button>
          <button onClick={handleExit}><RxCross2/></button>
        </form>
      )}

      {update && (
        <form className="update-form-container" onSubmit={handleUpdate}>
          <input
            type="text"
            value={course_id}
            placeholder="Course Id"
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            value={description}
            placeholder="About instructor"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            value={occupation}
            placeholder="Occupation"
            onChange={(e) => setOccupation(e.target.value)}
          />
          <button type="submit">Update</button>
          <button onClick={handleExit}><RxCross2/></button>
        </form>
      )}
    </div></>
  );
};

export default Instructors;
