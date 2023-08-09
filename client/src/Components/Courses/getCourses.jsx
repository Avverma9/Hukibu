import { useState, useEffect } from 'react';

const GetCourses = () => {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        fetch('http://13.127.11.171:3000/courses/all')
            .then(response => response.json())
            .then(data => {
                setCourseData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Course Data</h2>
            {courseData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Course Description</th>
                            <th>Price</th>
                            <th>Images</th>
                            <th>What You Get</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map(course => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.courseName}</td>
                                <td>{course.courseDesc}</td>
                                <td>{course.price}</td>
                                <td>{<img src={course.images}/>}</td>               
                                <td>{course.whatYouGet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No course data available</p>
            )}
        </div>
    );
}

export default GetCourses;
