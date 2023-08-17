import React,{useState} from "react";
const AddStep=()=>{
    const [activity_id,setActivityId]=useState("")
    const [step_description,setStepDescription]=useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch("http://13.235.242.110:3000/admin-addsteps", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              activity_id,
              step_description,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data) {
              alert("New step added");
            }
          } else {
            console.error("Failed to add new step");
          }
        } catch (error) {
          console.error("Error adding new step:", error);
        }
      };

    return (
        <form onClick={handleSubmit}>
           
            <input type="number" maxLength={15} value={activity_id} placeholder="Enter activity ID" onChange={(e)=>setActivityId(e.target.value)} />
          <input type="text" value={step_description} placeholder="About step" onChange={(e)=>setStepDescription(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
    )
}

export default AddStep