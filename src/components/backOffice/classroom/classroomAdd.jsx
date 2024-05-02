import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addClassroom } from '../../../service/classroomService';
import { classValidator } from '../../Validators/classValidator';

function ClassroomAdd() {
  const classroomTypes = ['Instrument', 'Solfege'];
    const {locationId} = useParams();
    const navigate = useNavigate();

    const initialValues = {
        number:0,
        floor:0,
        location:'',
        status: '',
        type:''
      
      }

      const {values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, setFieldValue} = useFormik({
        initialValues : initialValues, 
        validationSchema: classValidator,
        onSubmit: async (values) => {
            values.location = locationId;
            values.status = 'available'
            console.log(values);
            await addClassroom(values);
            navigate('/admin/locations');
        }
      })

  return (
<div className="ml-4 mt-2 col-11">
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0"><i class="menu-icon fa-solid fa-chalkboard-user"></i>Classroom</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">Number</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"></span>
            <input type="number" name='number' min={0} value={values.number} onBlur={handleBlur} onChange={handleChange} id="basic-icon-default-email" className={errors.number && touched.number ? "form-control is-invalid" : "form-control"} />
          </div>
          {errors.number && touched.number && <p className='alert alert-danger text-dark fw-bold'>{errors.number}</p>}
          {/*<div className="form-text"> You can use letters, numbers &amp; periods </div>*/}

        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">Floor</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"></span>
            <input type="number" name='floor' min={0} value={values.floor} onBlur={handleBlur} onChange={handleChange} id="basic-icon-default-email" className={errors.floor && touched.floor ? "form-control is-invalid" : "form-control"} />
          </div>
          {errors.floor && touched.floor && <p className='alert alert-danger text-dark fw-bold'>{errors.floor}</p>}
          {/*<div className="form-text"> You can use letters, numbers &amp; periods </div>*/}

        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-phone">Type</label>
          <div className="input-group input-group-merge">
            <select id="select2Basic" name='type' value={values.type} onBlur={handleBlur} onChange={handleChange} className={errors.type && touched.type  ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"} data-allow-clear="true">
            <option value="">Select a classroom type</option>
            {classroomTypes.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
          {errors.type && touched.type && <p className='alert alert-danger text-dark fw-bold'>{errors.type}</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isValid}>Save</button>
      </form>
    </div>
  </div>
</div>  )
}

export default ClassroomAdd