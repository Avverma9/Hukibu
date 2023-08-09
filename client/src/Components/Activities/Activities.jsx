import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState([]);

  useEffect(() => {
    fetch('http://13.127.11.171:3000/allActivity')
      .then(response => response.json())
      .then(data => {
        setActivitiesData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Activities</h2>
      {activitiesData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Images</th>
              <th>Name</th>
              <th>Time Duration</th>
            </tr>
          </thead>
          <tbody>
            {activitiesData.map(activities => (
              <tr key={activities.id}>
                <td>{activities.id}</td>
                <td>{activities.name}</td>
                <td>
                  <img
                    src={activities.images}
                    alt={`Activity ${activities.id} Thumbnail`}
                  />
                </td>
                <td>{activities.time_duration}</td>
                <td>
                  <Link to={`/activities/${activities.id}`}>
                    <BiShow />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activities data available</p>
      )}
    </div>
  );
};

export default Activities;
