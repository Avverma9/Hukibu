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
    const response = await fetch(
      `http://139.59.68.139:3000/admin-deleteCourseById/${id}`,
      {
        method: "GET",
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      window.location.reload();
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
              <tr className="input-field-container">
                <td className="input-data" colSpan="7">
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
                      placeholder="Image"
                      name="image"
                      defaultValue={updatedImage}
                    />
                     <input
                      type="text"
                      placeholder="Enter your content link"
                      name="youtubelink"
                      defaultValue={youtubelink}
                    />
                    <button className="sub-btn-btn" type="submit"><CiLocationArrow1/></button>
                    <button className="cross-btn" onClick={() => setShowUpdateForm(false)}>
                      <RxCross2/>
                    </button>
                  </form>
                </td>
              </tr>
            )}
        <h1>Course List</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Price</th>
              <th>What You Get</th>
              <th>Image</th>
              <th>Content</th>
              <th>Added at</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.courseName}</td>
                <td className="bold-text">{e.courseDesc}</td>

                <td>{e.price}</td>
                <td>{e.whatYouGet}</td>
                <td>
                  <img
                    src={`http://139.59.68.139:3000/uploads/${e.images}`}
                    alt=""
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{e.youtubelink}</td>
<td>{e.createdAt.substring(0,10)}</td>
                <td>
                  <button className="dlt-btn" onClick={() => handleDeleteUser(e.id)}><AiOutlineDelete/></button>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleUpdateClick(e)}><AiOutlineEdit color="blue"/></button>
                </td>
              </tr>
            ))}
           
          </tbody>
        </table>
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
      {/* <button href="/add-courses" color="black">Add Courses </button> */}
      <button>
        <a
          href="/add-courses"
          style={{ textDecoration: "none", color: "white" }}
        >
          Add courses
        </a>
      </button>
    </>
  );
};

export default Courses;
