import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStep = () => {
  const navigate=useNavigate()
  const [activity_id, setActivityId] = useState("");
  const [step_description, setStepDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("activity_id", activity_id);
    formData.append("step_description", step_description);
    formData.append("title", title);
    formData.append("image", image);

    try {
      const response = await fetch("http://139.59.68.139:3000/admin-addsteps", {
        method: "POST",
        body: formData,
      });
  if (response.ok){
      navigate("/all-steps")
    }
     
    } catch (error) {
      console.error("Error adding new step:", error);
    }
  
  };

  const handleActivityIdChange = (e) => {
    setActivityId(e.target.value);
  };

  const handleStepDescriptionChange = (e) => {
    setStepDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        maxLength={15}
        value={activity_id}
        placeholder="Enter activity ID"
        onChange={handleActivityIdChange}
      />
      <input
        type="text"
        value={step_description}
        placeholder="About step"
        onChange={handleStepDescriptionChange}
      />
      <input
        type="text"
        value={title}
        placeholder="Set step title"
        onChange={handleTitleChange}
      />
      <input
        type="file"
        onChange={handleImageChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStep;
