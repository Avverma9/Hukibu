import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleActivities = () => {
  const { id } = useParams();
  const [activityDetails, setActivityDetails] = useState(null);

  useEffect(() => {
    fetch(`http://13.127.11.171:3000/getActivity/${id}`)
      .then(response => response.json())
      .then(data => {
        setActivityDetails(data);
      })
      .catch(error => console.error('Error fetching activity details:', error));
  }, [id]);

  return (
    <div className="container mt-5">
      {activityDetails ? (
        <div>
          <h3>Activity Information</h3>
          {/* <p>ID: {activityDetails.activity.id}</p>
          <p>Name: {activityDetails.activity.name}</p>
          <p>Time Duration: {activityDetails.activity.time_duration}</p> */}
          
          <h3>Materials</h3>
          {activityDetails.materialData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Material Name</th>
                </tr>
              </thead>
              <tbody>
                {activityDetails.materialData.map(material => (
                  <tr key={material.id}>
                    <td>{material.id}</td>
                    <td>{material.material_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No material data available</p>
          )}
          
          <h3>Steps</h3>
          {activityDetails.stepData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Step Description</th>
                </tr>
              </thead>
              <tbody>
                {activityDetails.stepData.map(step => (
                  <tr key={step.id}>
                    <td>{step.id}</td>
                    <td>{step.step_description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No step data available</p>
          )}
        </div>
      ) : (
        <p>Loading activity details...</p>
      )}
    </div>
  );
};

export default SingleActivities;
