import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {CiLocationArrow1} from 'react-icons/ci';
import {RxCross2} from 'react-icons/rx';
import "./course.css";

const Courses = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedCourseName, setUpdatedCourseName] = useState("");
  const [updatedCourseDesc, setUpdatedCourseDesc] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedWhatYouGet, setUpdatedWhatYouGet] = useState(["", "", ""]);
  const [youtubelink, setYoutubeLink] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // get API
  useEffect(() => {
    fetch("http://139.59.68.139:3000/courses/all")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);


// delete
const handleDeleteUser = async (id) => {

  const confirmed = window.confirm("Are you sure you want to delete this course?");

  if (confirmed) {
    const response = await fetch(
      `http://139.59.68.139:3000/admin-deleteCourseById/${id}`,
      {
        method: "GET",
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      alert("successfully deleted !")
      const deletedData= data.filter(course=>course.id !== id)
      setData(deletedData)
    }
  }
};

  const handleUpdateClick = (course) => {
    setUpdatedCourseName(course.courseName);
    setUpdatedCourseDesc(course.courseDesc);
    setUpdatedPrice(course.price);
    setUpdatedWhatYouGet(course.whatYouGet);
    setYoutubeLink(course.youtubelink);
    setUpdatedImage(course.image);
    setUpdate(course);
    setShowUpdateForm(true);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", e.target.courseName.value);
    formData.append("courseDesc", e.target.courseDesc.value);
    formData.append("price", e.target.price.value);
    formData.append("whatYouGet", e.target.whatYouGet.value);
    formData.append("youtubelink", e.target.youtubelink.value);
    formData.append("image", e.target.image.files[0]);

    if (update && update.id) {
      try {
        const response = await axios.post(
          `http://139.59.68.139:3000/admin-updateCourse/${update.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          alert("Updated successfully");
          window.location.reload("/get-courses")
          setShowUpdateForm(false);
        } else {
          alert("Update failed");
        }
      } catch (error) {
        console.error("Error updating course:", error);
        alert("An error occurred while updating");
      }
    } else {
      alert("Invalid 'update' object");
    }
  };

  // pagintion ka code yaha se start hai
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = data.slice(startIndex, endIndex);
  return (
    <>
      <div>
        {showUpdateForm && (
          <div className="input-field-container">
            <div className="course-update-form">
              <form className="input-form-data" onSubmit={(e) => handleUpdateSubmit(e)}>
                <input
                  type="text"
                  placeholder="Enter course name"
                  name="courseName"
                  defaultValue={updatedCourseName}
                />
                <textarea
                  type="text"
                  placeholder="Enter course description"
                  name="courseDesc"
                  defaultValue={updatedCourseDesc}
                />
                <input
                  type="text"
                  placeholder="What you get"
                  name="whatYouGet"
                  defaultValue={updatedWhatYouGet}
                />
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  defaultValue={updatedPrice}
                />
                <input
                  type="file"
                  name="image"
                />
                <input
                  type="text"
                  placeholder="Enter your content link"
                  name="youtubelink"
                  defaultValue={youtubelink}
                />
                <button className="sub-btn-btn" type="submit">
                  <CiLocationArrow1 />
                </button>
                <button className="cross-btn" onClick={() => setShowUpdateForm(false)}>
                  <RxCross2 />
                </button>
              </form>
            </div>
          </div>
        )}
        <h1>Course List</h1>
       <button className="add-course-button">
        <a href="/add-courses" style={{ textDecoration: "none", color: "white" }}>
        Add courses
        </a></button> 
  
        <div className="card-container">
          {currentItems.map((e) => (
            <div key={e.id} className="course-card">
              <div className="course-info">
                <h2>{e.courseName}</h2>
                <p className="bold-text">{e.courseDesc}</p>
                <p>Price: {e.price}</p>
                <p>What You Get: {e.whatYouGet}</p>
                <p>Added at: {e.createdAt.substring(0, 10)}</p>
                <a href={e.youtubelink} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube <CiLocationArrow1 />
                </a>
              </div>
              <div className="course-image">
                <img
                  src={`http://139.59.68.139:3000/uploads/${e.images}`}
                  alt=""
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
              <div className="course-actions">
                <button className="dlt-btn" onClick={() => handleDeleteUser(e.id)}>
                  <AiOutlineDelete />
                </button>
                <button className="edit-btn" onClick={() => handleUpdateClick(e)}>
                  <AiOutlineEdit color="blue" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevClick}>&lt; Prev</button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextClick}>Next &gt;</button>
        </div>
      </div>
    
    </>
  );
  
};

export default Courses;
