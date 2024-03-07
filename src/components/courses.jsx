import { useEffect, useState } from "react";
import { fetchCourses } from "../service/courseService";

function Courses()
{
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      fetchData();
  },[])

  const fetchData = async () => {
    try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
    } catch (error) {
        console.error(error.message);
    }
};

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
                  <button className="btn btn-link dropdown-toggle btn-icon-only" type="button" data-toggle="dropdown" aria-expanded="false"><i className="ni ni-settings-gear-65" /></button>
                  <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end"><a className="dropdown-item" href="javascript:;">Edit Profile</a><a className="dropdown-item" href="javascript:;">Settings</a><a className="dropdown-item" href="javascript:;">Log out</a></div>
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
                  <button type="button" class="btn btn-primary w-px-350 mt-4 ml-4">
                    <span><i class="fa-solid fa-feather"></i></span> Enroll
                  </button>
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

