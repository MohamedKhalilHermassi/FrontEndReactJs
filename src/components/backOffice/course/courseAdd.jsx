import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { courseValidator } from '../../Validators/CourseValidator';
import { addCourse } from '../../../service/courseService';
import userService from '../../../service/userService';


const CourseAdd = (props) => {
  const [hidden, setHidden] = useState(true);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetchTeachers();
    console.log(teachers);
    if(props.course){
      if(props.course._id){
    setHidden(false);
      }
    }
  }, [])

const fetchTeachers = async () => {
  try {
      const teachersData = await userService.getTeachers();
      setTeachers(teachersData);
  } catch (error) {
      console.error(error.message);
  }
};

  const initialValues = {
    ...props.course
  
  }
    const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7'];
    const courseTypes = ['Instrument', 'Solfege'];
    const navigate = useNavigate();
    const {values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, setFieldValue} = useFormik({
      initialValues : initialValues, 
      validationSchema: courseValidator,
      onSubmit: async (values) => {
        try {
          const formData = new FormData();
          Object.keys(values).forEach((key) => formData.append(key, values[key]));
          await addCourse(formData);
          navigate("/admin/courses")

        } catch (error) {
          console.error('Error adding course:', error);
        }
      }
    })

  return (
    <>
<div className="ml-4 mt-2 col-11">
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0"><i className="menu-icon fas fa-book" />Course</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-fullname">Name</label>
          <div className="input-group input-group-merge">
            <input type="text" name='name' value={values.name} onBlur={handleBlur} onChange={handleChange} className={errors.name && touched.name ? "form-control is-invalid" : "form-control"} id="basic-icon-default-fullname" placeholder="Guitar" />
          </div>
          {errors.name && touched.name && <p className='alert alert-danger text-dark fw-bold'>{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">Hourly based price</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"><i class="fas fa-money-bill-wave"></i></span>
            <input type="number" name='hourly_based_price' min={1} value={values.hourly_based_price} onBlur={handleBlur} onChange={handleChange} id="basic-icon-default-email" className={errors.hourly_based_price && touched.hourly_based_price ? "form-control is-invalid" : "form-control"} placeholder="20 TND" />
          </div>
          {errors.hourly_based_price && touched.hourly_based_price && <p className='alert alert-danger text-dark fw-bold'>{errors.hourly_based_price}</p>}
          {/*<div className="form-text"> You can use letters, numbers &amp; periods </div>*/}

        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-phone">Type</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-phone2" className="input-group-text"><i class="fas fa-list"></i></span>
            <select id="select2Basic" name='courseType' value={values.courseType} onBlur={handleBlur} onChange={handleChange} className={errors.courseType && touched.courseType  ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"} data-allow-clear="true">
            <option value="">Select a course type</option>
            {courseTypes.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
          {errors.courseType && touched.courseType && <p className='alert alert-danger text-dark fw-bold'>{errors.courseType}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-phone">Level</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-phone2" className="input-group-text"><i class="fas fa-ranking-star"></i></span>
            <select id="select2Basic" name='level' value={values.level} onBlur={handleBlur} onChange={handleChange} className={errors.level && touched.level ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"} data-allow-clear="true">
            <option value="">Select a Level</option>
            {levels.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
          {errors.level && touched.level && <p className='alert alert-danger text-dark fw-bold'>{errors.level}</p>}
        </div>
        {hidden &&
        <div className="mb-3">
        <label className="form-label" htmlFor="basic-icon-default-email">File</label>
        <input class="form-control form-control-lg" id="formFileLg" type="file" name='file' onBlur={handleBlur} onChange={(event) => setFieldValue('file', event.target.files[0])} ></input>
        {errors.file && <p className='alert alert-danger text-dark fw-bold'>{errors.file}</p>}
        </div>
        }

<div className="mb-3">
  <label className="form-label" htmlFor="basic-icon-default-phone">Teacher</label>
  <div className="input-group input-group-merge">
    <span id="basic-icon-default-phone2" className="input-group-text"><i class="fa-solid fa-chalkboard-user"></i></span>
    <select
      id="select2Basic"
      name='teacher'
      value={values.teacher}
      onBlur={handleBlur}
      onChange={handleChange}
      className={errors.teacher && touched.teacher ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"}
      data-allow-clear="true"
    >
      <option value="">Select a Teacher</option>
      {teachers.map((teacher) => (
        <option key={teacher._id} value={teacher._id}>{teacher.fullname}</option>
      ))}
    </select>
  </div>
  {errors.teacher && touched.teacher && <p className='alert alert-danger text-dark fw-bold'>{errors.teacher}</p>}
</div>


        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-message">Description</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-message2" className="input-group-text"><i className="fas fa-align-left"></i></span>
            <textarea id="basic-icon-default-message" name='description' value={values.description} onBlur={handleBlur} onChange={handleChange} className="form-control" placeholder="In this course you will master all the guitars features" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>Save</button>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

export default CourseAdd