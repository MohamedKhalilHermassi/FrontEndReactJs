import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CourseAdd from './courseAdd';
import { fetchCourseById } from '../../../service/courseService';

function CourseDetails(props) {
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      fetchCourse(props.course._id);
  }, []);



  const fetchCourse = async (id) => {
    try {
        const courseData = await fetchCourseById(id);
        console.log(courseData);
        setCourse(courseData);
    } catch (error) {
        console.error(error.message);
    }
};

  return (
    <>
    <button className="btn btn-primary mt-3" onClick={handleShow}>View Details</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.course.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseAdd course = {course}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CourseDetails;