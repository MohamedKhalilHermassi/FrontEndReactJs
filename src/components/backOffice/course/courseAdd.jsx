import axios from 'axios';
import React from 'react'

const CourseAdd = () => {
    const levels = ['Niveau1', 'Niveau2', 'Niveau3', 'Niveau4', 'Niveau5'];
    const courseTypes = ['Instrument', 'Solfege'];

    const submitForm = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData)

        console.log(import.meta.env.VITE_APIURL);
        axios.post(import.meta.env.VITE_APIURL+'courses/add', payload)
        .then(result => console.log(result))
        .catch(err => console.log(err));
        
    }

  return (
    <>
<div className="ml-4 mt-2 col-11">
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0"><i className="menu-icon fas fa-book" />Add a course</h5>
    </div>
    <div className="card-body">
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-fullname">Name</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-fullname2" className="input-group-text"><i className="fas fa-heading" /></span>
            <input type="text" name='name' className="form-control" id="basic-icon-default-fullname" placeholder="Guitar" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-email">Price</label>
          <div className="input-group input-group-merge">
            <span className="input-group-text"><i class="fas fa-money-bill-wave"></i></span>
            <input type="text" name='price' id="basic-icon-default-email" className="form-control" placeholder="20$" />
          </div>
          <div className="form-text"> You can use letters, numbers &amp; periods </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-phone">Type</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-phone2" className="input-group-text"><i class="fas fa-list"></i></span>
            <select id="select2Basic" name='courseType' class="select2 form-select form-select-lg" data-allow-clear="true">
            {courseTypes.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-phone">Level</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-phone2" className="input-group-text"><i class="fas fa-ranking-star"></i></span>
            <select id="select2Basic" name='level' class="select2 form-select form-select-lg" data-allow-clear="true">
            {levels.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="basic-icon-default-message">Description</label>
          <div className="input-group input-group-merge">
            <span id="basic-icon-default-message2" className="input-group-text"><i className="fas fa-align-left"></i></span>
            <textarea id="basic-icon-default-message" name='description' className="form-control" placeholder="In this course you will master all the guitars features" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

export default CourseAdd