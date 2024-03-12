import { useEffect, useState } from "react";
import { enrollement, fetchCourses } from "../service/courseService";
import { jwtDecode } from "jwt-decode";

function Courses()
{
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
      fetchData();
      const token = localStorage.getItem('userToken');
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.id);
      setUserId(decodedToken.id);
  },[])

  useEffect(() => {
  }, [courses]);

  const fetchData = async () => {
    try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
        console.log(courses[0].teacher.fullname);
    } catch (error) {
        console.error(error.message);
    }
};

  const enroll = async (courseId) =>{
    const userId = jwtDecode(localStorage.getItem('userToken')).id;
    await enrollement(courseId,userId);
    fetchData();
  }

    return (
        <>
      
          <section className="section team-2">
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto text-center mb-5">
            <br />

          <h3 className="display-3 text-orange">Our Available Courses</h3>
          {/*<h4 className="lead">This is the paragraph where you can write more details about your team. Keep you user engaged by providing meaningful information.</h4>*/}

        </div>
      </div>
      <div className="row">
      {courses.map((course, index) =>(
        <div className="col-lg-4 col-md-6">
          <div key={index} className="card card-profile" data-image="profile-image">
            <div className="card-header">
              <div className="card-image">
                <div className="dropdown">
                  <button className="btn btn-link dropdown-toggle btn-icon-only" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-chalkboard-user"></i></button>
                  <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end"><a className="dropdown-item" href="javascript:;">Instructed by {course.teacher.fullname}</a></div>
                </div>
                <a href="javascript:;">
                  <img className="img rounded" src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?cs=srgb&dl=pexels-north-1407322.jpg&fm=jpg" />
                </a>
              </div>
            </div>
            
            <div className="card-body pt-0">
              <h4 className="display-4 mb-0">{course.name}</h4>
              <p className="lead">{course.courseType}</p>
              <div className="table-responsive">
                <ul className="list-unstyled">
                  <li className="py-1">
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="badge badge-circle badge-info mr-3"><i class="fa-solid fa-ranking-star"></i></div>
                      </div>
                      <div>
                        <h6 className="mb-1">{course.level}</h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-1">
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="badge badge-circle badge-success mr-3"><i class="fa-solid fa-money-bill-wave"></i></div>
                      </div>
                      <div>
                        <h6 className="mb-1">{course.hourly_based_price} TND</h6>
                      </div>
                    </div>
                  </li>
                  {
                    !course.students.includes(userId) ? (
                      <button type="button" className="btn btn-primary w-px-350 mt-4 ml-4" onClick={() => enroll(course._id)}>
                        <span><i className="fa-solid fa-feather"></i></span> Enroll
                      </button>
                    ) : (
                      <button type="button" className="btn btn-primary w-px-350 mt-4 ml-4" disabled = {true}>
                        <span><i className="fa-solid fa-feather"></i></span> Enrolled
                      </button>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  </section>
          </>
    )
} export default Courses;

