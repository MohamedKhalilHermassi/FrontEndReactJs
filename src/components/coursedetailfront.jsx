import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Comments from './commentaire/comments'; // Import the Comments component
import '../components/commentaire/commentaire.css'; 

function Coursdetails() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Define currentUser state

  useEffect(() => {
    console.log('Fetching course details...');
    fetch(`https://backendexpressjs-2.onrender.com/courses/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Course details fetched successfully:', data);
        setCourse(data);
      })
      .catch(error => console.error('Error fetching course details:', error));

    const token = localStorage.getItem('userToken');
    if (token) {
      console.log('User token found in localStorage:', token);
      const decodedToken = jwtDecode(token);
      console.log('Decoded user ID:', decodedToken.id);
      setCurrentUser(decodedToken); // Set currentUser state with decoded token
    } else {
      console.log('User token not found in localStorage.');
    }
  }, [id]);

  if (!course || !currentUser) {
    console.log('Course or currentUser is null. Rendering loading message...');
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  console.log('Rendering course details...');
  console.log('currentUser:', currentUser); // Log currentUser before rendering the child component

  const onSubmitAction = (data) => {
    console.log('this comment was posted!', data);
    // Add logic to update the comment section's data if needed
  };

  const customNoComment = () => <div className='no-com'>No comments wohoooo!</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-body pt-0">
            <div>
              <img className="img rounded h-75 w-75" src={`https://backendexpressjs-2.onrender.com/images/${course.image}`} />
            </div>
            <h4 className="display-4 mb-0">{course.name}</h4>
            <p className="lead">{course.courseType}</p>
            <div className="table-responsive">
              <ul className="list-unstyled">
                <li className="py-1">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="badge badge-circle badge-info mr-3"><i className="fa-solid fa-ranking-star"></i></div>
                    </div>
                    <div>
                      <h6 className="mb-1"><span className="badge bg-label-primary">{course.level}</span></h6>
                    </div>
                  </div>
                </li>
                <li className="py-1">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="badge badge-circle badge-success mr-3"><i className="fa-solid fa-money-bill-wave"></i></div>
                    </div>
                    <div>
                      <h6 className="mb-1"><span className="badge bg-label-primary">{course.hourly_based_price} TND</span></h6>
                    </div>
                  </div>
                </li>
              </ul>currentUser
            </div>
          </div>
          {/* Comment Section */}
          {console.log('Rendering Comment Section...')}
          {currentUser && <Comments  courseId={id} />}
        </div>
      </div>
    </div>
  );
}

export default Coursdetails;
