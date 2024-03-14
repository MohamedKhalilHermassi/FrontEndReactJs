import { useFormik } from 'formik';
import React from 'react'

function ClassroomAdd() {
    const etablissements=['menzah', 'ariana']

    const initialValues = {
        name:'',
        etage:0,
        location:'',
      
      }

      const {values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, setFieldValue} = useFormik({
        initialValues : initialValues, 
        //validationSchema: courseValidator,
        onSubmit: async (values) => {
            console.log(values);
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
          <label className="form-label" htmlFor="basic-icon-default-fullname">Name</label>
          <div className="input-group input-group-merge">
            <input type="text" name='name' value={values.name} onBlur={handleBlur} onChange={handleChange} className={errors.name && touched.name ? "form-control is-invalid" : "form-control"} id="basic-icon-default-fullname" placeholder="Guitar" />
          </div>
          {errors.name && touched.name && <p className='alert alert-danger text-dark fw-bold'>{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">etage</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"></span>
            <input type="number" name='etage' min={0} value={values.etage} onBlur={handleBlur} onChange={handleChange} id="basic-icon-default-email" className={errors.etage && touched.etage ? "form-control is-invalid" : "form-control"} placeholder="20 TND" />
          </div>
          {errors.etage && touched.etage && <p className='alert alert-danger text-dark fw-bold'>{errors.etage}</p>}
          {/*<div className="form-text"> You can use letters, numbers &amp; periods </div>*/}

        </div>

        <div className="mb-3">
        <label className="form-label" htmlFor="basic-icon-default-phone">Location</label>
        <div className="input-group input-group-merge">
            <select
            id="select2Basic"
            name='teacher'
            value={values.teacher}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.teacher && touched.teacher ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"}
            data-allow-clear="true"
            >
            <option value="">Select a Location</option>
            {etablissements.map((etablissement, index) => (
                <option key={index} value={etablissement}>{etablissement}</option>
            ))}
            </select>
        </div>
        {errors.teacher && touched.teacher && <p className='alert alert-danger text-dark fw-bold'>{errors.teacher}</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isValid}>Save</button>
      </form>
    </div>
  </div>
</div>  )
}

export default ClassroomAdd