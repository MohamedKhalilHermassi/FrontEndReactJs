import { useEffect, useState } from "react";
import { enrollement, fetchCourses } from "../service/courseService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Courses()
{
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7'];
  const courseTypes = ['Instrument', 'Solfege'];

  useEffect(() => {
      fetchData();
      const token = localStorage.getItem('userToken');
      if(token){
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      }
  },[])

  useEffect(() => {
  }, [courses]);

  const fetchData = async () => {
    try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
    } catch (error) {
        console.error(error.message);
    }
};

  const enroll = async (courseId) =>{
    if(!userId){
      navigate('/signin');
      toast('Please Sign In to enroll !', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
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

          <h3 className="display-3 text-orange mt-3">Our Available Courses</h3>
          {/*<h4 className="lead">This is the paragraph where you can write more details about your team. Keep you user engaged by providing meaningful information.</h4>*/}

        </div>
      </div>
      <div className="row">
      <div className='row'>
<div className="my-3 ml-5 w-25">
          <label for="defaultFormControlInput" className="form-label" >Level</label>
          <div className="input-group input-group-merge">
            <select id="select2Basic" name='level' className="select2 form-select form-select-lg" data-allow-clear="true" onChange={(e) =>setLevelFilter(e.target.value)}>
            <option value="">Select a level</option>
            {levels.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
        </div>
<div className="my-3 ml-5 w-50">
          <label for="defaultFormControlInput" className="form-label" >Type</label>
          <div className="input-group input-group-merge">
            <select id="select2Basic" name='courseType' className="select2 form-select form-select-lg" data-allow-clear="true" onChange={(e) =>setType(e.target.value)}>
            <option value="">Select a course type</option>
            {courseTypes.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
        </div>
        </div>
      {courses.filter((course) => {
        if(type === '' && levelFilter === ''){
        return course
      }
      if(type != ''){
        return course.courseType == type;
      }
      if(levelFilter != ''){
        return course.level == levelFilter;
      }
      if(type != '' && levelFilter != ''){
        return (course.courseType == type) || (course.level == levelFilter);
      }    
      }).map((course, index) =>(
        <div className="col-lg-4 col-md-6">
          <div key={index} className="card card-profile" data-image="profile-image">
            <div className="card-header">
              <div className="card-image">
                <div className="dropdown">
                  <button className="btn btn-link dropdown-toggle btn-icon-only" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-chalkboard-user"></i></button>
                  <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end"><a className="dropdown-item" href="javascript:;">Instructed by {course.teacher.fullname}</a></div>
                </div>
                <a href={`/courses/${course._id}`}>
                  <img className="img rounded" src={`http://localhost:3000/images/${course.image}`} />
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
                        <h6 className="mb-1"><span class="badge bg-label-primary">{course.level}</span></h6>
                      </div>
                    </div>
                  </li>
                  <li className="py-1">
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="badge badge-circle badge-success mr-3"><i class="fa-solid fa-money-bill-wave"></i></div>
                      </div>
                      <div>
                        <h6 className="mb-1"><span class="badge bg-label-primary">{course.hourly_based_price} TND</span></h6>
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

