import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {TbArrowBackUp} from 'react-icons/tb';
import {VscAdd} from 'react-icons/vsc';
import "./AddCourses.css"
const AddCourse=()=>{
    const navigate = useNavigate()
    const location= useLocation()
    const [courseName,setCourseName]=useState("")
    const [courseDesc,setCourseDesc]=useState("")
    const [price,setPrice]=useState("")
    const [whatYouGet,setWhatYouGet]=useState(["","",""])
    const [youtubelink,setYoutubeLink]=useState("")
    const [image,setImage]=useState(null)



    const handleSubmit=async(e)=>{
        e.preventDefault()
    
            const formData = new FormData();
            formData.append('courseName',courseName);
            formData.append('courseDesc',courseDesc);
            formData.append('price',price);
            formData.append('whatYouGet',whatYouGet);
            formData.append('youtubelink',youtubelink);
            formData.append('image',image);
    
            const response = await fetch('http://139.59.68.139:3000/admin-addCourse', {
                method: 'POST',
                body: formData
            });
    
            const responseData = await response.json();
            console.log(responseData);
            if(response.ok){
                alert("data created")
            }      
    }
    const handleBack = () => {
         navigate(-1); // Navigate back to the previous page
    }
if(location.pathname !== "/add-courses"){
    return null
}
    return (
        <>
           <button className="backarrow-btn" onClick={handleBack}><TbArrowBackUp/>Go Back</button>
        <form className="addcoarse-form" onSubmit={handleSubmit}>
        
     
        
        
        <div className="form-field">
        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div className="form-field-desc">
  <label>Course Description:</label>
  <textarea
    value={courseDesc}
    onChange={(e) => setCourseDesc(e.target.value)}
    rows={6} 
  />
</div>

        <div className="form-field-price">
        <label>Price:</label>
        <br />
        <input type="text" placeholder="Enter course price ...." value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-field-what">
        <label>What You Get:</label>
        <input type="text" placeholder="What you get ......" value={whatYouGet[0]} onChange={(e) => setWhatYouGet([e.target.value, whatYouGet[1], whatYouGet[2]])} />
        <input type="text" placeholder="What you get ......" value={whatYouGet[1]} onChange={(e) => setWhatYouGet([whatYouGet[0], e.target.value, whatYouGet[2]])} />
        <input type="text" placeholder="What you get ......" value={whatYouGet[2]} onChange={(e) => setWhatYouGet([whatYouGet[0], whatYouGet[1], e.target.value])} />
       <div className="form-field-video">
         <label >Video Link</label>
         <br />
         <input type="text" placeholder="Enter your content link here" value={youtubelink} onChange={(e) => setYoutubeLink(e.target.value)} />
</div></div>
<div className="form-field-file">
        <label>Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])}  />
     
        </label>
        </div> 

        <button className="add-btn" type="submit"><VscAdd/>Add</button>
    </form>
    </>
    )

}
export default AddCourse