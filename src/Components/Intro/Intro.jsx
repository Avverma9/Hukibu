import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Intro.module.css'
const Intro = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
  
    try {
      const response = await fetch("http://139.59.68.139:3000/admin-add-intropage", {
        method: "POST",
        body: formData,
      });
  
      if (response.status === 200) {
        alert("Intro added successfully");
        // Clear form inputs
        setTitle("");
        setImage(null);
        setDescription("");
      } else {
        setError("Failed to add intro");
      }
    } catch (error) {
      setError("Error adding intro: " + error.message);
    }
  };
  
  useEffect(() => {
    fetch("http://139.59.68.139:3000/admin-get-all-intropage")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((error) => setError("Error fetching intros: " + error.message));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `http://139.59.68.139:3000/admin-delete-intropage/${id}`
      );
      if (response.status === 200) {
        alert("Intro deleted");
     
        setData(data.filter((intro) => intro.id !== id));
      } else {
        setError("Failed to delete intro");
      }
    } catch (error) {
      setError("Error deleting intro: " + error.message)
    }
  };

  return (
    
    <div className={styles.container}>
        <h3>_____________________________________You can add here___________________________________</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="images" className={styles.formLabel}>Images:</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.formTextarea}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <hr />
      </form>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.introList}>
        {data.map((intro) => (
          <div key={intro.id} className={styles.introItem}>
            <h2 className={styles.introTitle}>{intro.title}</h2>
            <p className={styles.introDescription}>{intro.description}</p>
            <img
              src={`http://139.59.68.139:3000/uploads/${intro.image}`}
              alt={intro.title}
              className={styles.introImage}
            />
            <button
              onClick={() => handleDelete(intro.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intro;
