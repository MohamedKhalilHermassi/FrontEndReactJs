import { useState } from 'react';
import axios from 'axios';

function AddProductForm() {

  const productType = {
    book: 'Book',
    instrument: 'Instrument'
    
  };
  const productCondition = {
    Old: 'Old',
    Slightly: 'Slightly Used',
    New:'New'
    
  };



  const [formData, setFormData] = useState({
    user: localStorage.getItem('id'),
    type: '',
    name: '',
    description: '',
    archived: false,
    price: '',
    condition: 'Old',
    image: null
  }); 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error message when the field value changes
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({ ...errors, image: '' }); // Clear the error message when a file is selected
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = 'Product price is required';
      isValid = false;
    } else if (isNaN(formData.price)) {
      newErrors.price = 'Product price must be a number';
      isValid = false;
    }
    else if (parseFloat(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative.';
    }

    if (!formData.condition.trim()) {
      newErrors.condition = 'Product condition is required';
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = 'Product image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading state to true when form is submitted

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('product', JSON.stringify(formData));
      formDataToSend.append('image', formData.image);
      setTimeout(() => {
        console.log('Waited for 3 seconds');
      }, 3000);
      
      await axios.post('http://localhost:3000/market/add-product', formDataToSend);

      console.log('Product added successfully');
      setSuccessMessage('Product added successfully');

    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        {successMessage && (
          <div className="alert alert-success">
            <div className='text-green'>
              <strong>{successMessage}</strong>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Product Name" value={formData.name} onChange={handleChange} />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="col-md-6">
              <input type="text" name="description" className="form-control" placeholder="Product Description" value={formData.description} onChange={handleChange} />
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>
            <div className="col-md-4">
              <input type="number" name="price" className="form-control" placeholder="Product Price" value={formData.price} onChange={handleChange} />
              {errors.price && <div className="text-danger">{errors.price}</div>}
            </div>
            <div className="col-md-4">
              <select name="condition" className="form-control" value={formData.condition} onChange={handleChange}>
                {Object.entries(productCondition).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              {errors.condition && <div className="text-danger">{errors.condition}</div>}
            </div>
            <div className="col-md-4">
              <input type="file" name="image" className="form-control" onChange={handleFileChange} />
              {errors.image && <div className="text-danger">{errors.image}</div>}
            </div>
            <div className="col-md-4">
              <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                {Object.entries(productType).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              {errors.condition && <div className="text-danger">{errors.type}</div>}
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary position-relative w-auto" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm position-absolute top-50 start-50 translate-middle" role="status" aria-hidden="true"></span>
                )}
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
        <h1 className='mt-5'>Thanks for choosing to become a seller!</h1>

        <div className='d-flex justify-content-center'>
          <img height={250} width={250} src="https://i.pinimg.com/originals/17/09/0b/17090b01dc64aae1891a99db12af2d7b.gif" alt="" />
        </div>
      </div>
    </>
  );
}

export default AddProductForm;