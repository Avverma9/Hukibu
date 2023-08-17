import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {TbArrowBackUp} from 'react-icons/tb';
import {VscAdd} from 'react-icons/vsc';
import "./course.css"
const AddCourse=()=>{
    const navigate = useNavigate()
    const location= useLocation()
    const [courseName,setCourseName]=useState("")
    const [courseDesc,setCourseDesc]=useState("")
    const [price,setPrice]=useState("")
    const [whatYouGet,setWhatYouGet]=useState(["","",""])
    const [image,setImage]=useState(null)



    const handleSubmit=async(e)=>{
        e.preventDefault()
    
            const formData = new FormData();
            formData.append('courseName',courseName);
            formData.append('courseDesc',courseDesc);
            formData.append('price',price);
            formData.append('whatYouGet',whatYouGet);
            formData.append('image',image);
    
            const response = await fetch('http://13.235.242.110:3000/admin-addCourse', {
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
           <button className="backarrow-btn" onClick={handleBack}><TbArrowBackUp/></button>
        <form className="addcoarse-form" onSubmit={handleSubmit}>
        
     
        
        
        <div className="form-field">
        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div className="form-field">
        <label>Course Description:</label>
        <input type="text" value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} />
        </div>
        <div className="form-field">
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-field">
        <label>What You Get:</label>
        <input type="text" value={whatYouGet[0]} onChange={(e) => setWhatYouGet([e.target.value, whatYouGet[1], whatYouGet[2]])} />
        <input type="text" value={whatYouGet[1]} onChange={(e) => setWhatYouGet([whatYouGet[0], e.target.value, whatYouGet[2]])} />
        <input type="text" value={whatYouGet[2]} onChange={(e) => setWhatYouGet([whatYouGet[0], whatYouGet[1], e.target.value])} />
</div>
<div className="form-field-a">
        <label>Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        </div>
        <button className="add-btn" type="submit"><VscAdd/></button>
    </form>
    </>
    )

}
export default AddCourse