import { useEffect, useState } from "react";
import { enrollement, fetchCourses } from "../service/courseService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NotPaid from "./subscription/NotPaid";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState('');

    useEffect(() => {
        fetchData();
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setDecodedToken(decodedToken);
            setUserId(decodedToken.id);
        }
    }, [])

    useEffect(() => {
    }, [courses]);

    const fetchData = async () => {
      try {
          const coursesData = await fetchCourses();
          const filteredCoursesData = coursesData.filter(course => course.courseType === 'Instrument');
          setCourses(filteredCoursesData);
      } catch (error) {
          console.error(error.message);
      }
  };
  

    const enroll = async (courseId) => {
        if (!userId) {
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
        await enrollement(courseId, userId);
        fetchData();
    }

    return (
        <>
            {decodedToken.role === "Student" && decodedToken.paid === false ? (
                <NotPaid></NotPaid>

            ) : (
                <>
                    <section className="section team-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 mx-auto text-center mb-5">
                                    <br />
                                    <h3 className="display-3 text-orange mt-3">Our Available Courses</h3>
                                </div>
                            </div>
                            <div className="row">
                                {courses.map((course, index) => (
                                    <div className="col-lg-4 col-md-6" key={index}>
                                        <div className="card card-profile" data-image="profile-image">
                                            <div className="card-header">
                                                <div className="card-image">
                                                    <div className="dropdown">
                                                        <button className="btn btn-link dropdown-toggle btn-icon-only" type="button" data-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-chalkboard-user"></i></button>
                                                    </div>
                                                    <a href="javascript:;">
                                                        <img className="img rounded" src={`https://backendexpressjsback.onrender.com/images/${course.image}`} alt="Course" />
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
                                                        {
                                                            !course.students.includes(userId) ? (
                                                                <button type="button" className="btn btn-primary w-px-350 mt-4 ml-4" onClick={() => enroll(course._id)}>
                                                                    <span><i className="fa-solid fa-feather"></i></span> Enroll
                                                                </button>
                                                            ) : (
                                                                <button type="button" className="btn btn-primary w-px-350 mt-4 ml-4" disabled={true}>
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
            )}
        </>
    )
} export default Courses;
