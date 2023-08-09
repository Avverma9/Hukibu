import  { useState, useEffect } from 'react';
import { AiOutlineEdit,AiOutlineDelete } from 'react-icons/ai';
// import { Modal, Button, Spinner } from 'react-bootstrap';

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://13.127.11.171:3000/admin-getUser')
      .then(response => response.json())
      .then(data => {
        setUserData(data.data);
        console.log(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">User Data</h2>
      {userData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.mobile}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{<AiOutlineEdit/>}</td>
                <td>{<AiOutlineDelete/>}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default User;
