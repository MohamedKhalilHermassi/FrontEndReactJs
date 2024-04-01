import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react'
import data from '../../../assets/tunisiaData.json'
import { locationValidator } from '../../Validators/LocationValidator';
import { addLocation } from '../../../service/locationService';
import LocationMap from './locationMap';
import { useNavigate } from 'react-router-dom';

function AddLocation() {

  const [coordinates, setCoordinates] = useState();

  const navigate = useNavigate();

  const getlocation = (data) => {
    setCoordinates(data);
  }

  const initialValues = {
        state:'',
        city:'',
        address:'',
        lat:0,
        lng:0,
        numberOfFloors:1,
      
      }

  const {values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, setFieldValue} = useFormik({
        initialValues : initialValues, 
        validationSchema: locationValidator,
        onSubmit: async (values) => {
            values.lat = coordinates.lat;
            values.lng = coordinates.lng;
            await addLocation(values);
            navigate('/admin/locations');
        }
      })

  return (
<div className="ml-4 mt-2 col-11">
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0"><i class="menu-icon fa-solid fa-map-location-dot"></i>Location</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
        <label className="form-label" htmlFor="basic-icon-default-phone">State</label>
        <div className="input-group input-group-merge">
            <select
            id="select2Basic"
            name='state'
            value={values.state}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.state && touched.state ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"}
            data-allow-clear="true"
            >
            <option value="">Select a State</option>
            {Object.keys(data).map((state) => (
                <option key={state} value={state}>{state}</option>
            ))}
            </select>
        </div>
        {errors.state && touched.state && <p className='alert alert-danger text-dark fw-bold'>{errors.state}</p>}
        </div>
        
        <div className="mb-3">
        <label className="form-label" htmlFor="basic-icon-default-phone">City</label>
        <div className="input-group input-group-merge">
            <select
            id="select2Basic"
            name='city'
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.city && touched.city ? "select2 form-select form-select-lg is-invalid" : "select2 form-select form-select-lg"}
            data-allow-clear="true"
            >
            <option value="">Select a City</option>
            {data[values.state]?.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
            ))}
            </select>
        </div>
        {errors.city && touched.city && <p className='alert alert-danger text-dark fw-bold'>{errors.city}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-fullname">Address</label>
          <div className="input-group input-group-merge">
            <input type="text" name='address' value={values.address} onBlur={handleBlur} onChange={handleChange} className={errors.address && touched.address ? "form-control is-invalid" : "form-control"} id="basic-icon-default-fullname" placeholder="17 rue habib bourguiba" />
          </div>
          {errors.address && touched.address && <p className='alert alert-danger text-dark fw-bold'>{errors.address}</p>}
        </div>
      <div className='my-4'>
        <LocationMap getlocation = {getlocation}>
        </LocationMap>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">number Of Floors</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"></span>
            <input type="number" name='numberOfFloors' min={1} value={values.numberOfFloors} onBlur={handleBlur} onChange={handleChange} id="basic-icon-default-email" className={errors.numberOfFloors && touched.numberOfFloors ? "form-control is-invalid" : "form-control"} placeholder="write 1 if the building has only one floor" />
          </div>
          {errors.numberOfFloors && touched.numberOfFloors && <p className='alert alert-danger text-dark fw-bold'>{errors.numberOfFloors}</p>}
          {/*<div className="form-text"> You can use letters, numbers &amp; periods </div>*/}

        </div>

        <button type="submit" className="btn btn-primary" disabled={!isValid}>Save</button>
      </form>
    </div>
  </div>
</div>  )
}

export default AddLocation