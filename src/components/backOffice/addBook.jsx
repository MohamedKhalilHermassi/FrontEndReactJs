import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AddBookForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    level: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error message when the field value changes
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({ ...errors, image: '' }); // Clear the error message when a file is selected
  };


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!formData.name.trim()) {
      newErrors.name = 'Book name is required';
      isValid = false;
    }
  
    if (!formData.description.trim()) {
      newErrors.description = 'Book description is required';
      isValid = false;
    }
  
    if (!formData.price) {
      newErrors.price = 'Book price is required';
      isValid = false;
    } else if (isNaN(formData.price)) {
      newErrors.price = 'Book price must be a number';
      isValid = false;
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Book price must be a positive number';
      isValid = false;
    }
  
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
      isValid = false;
    }
  
    if (!formData.level.trim()) {
        newErrors.level = 'Book level is required';
        isValid = false;
      } else if (isNaN(formData.level)) {
        newErrors.level = 'Book level must be a number';
        isValid = false;
      } else {
        const level = parseInt(formData.level);
        if (level < 1 || level > 7) {
          newErrors.level = 'Book level must be between 1 and 7';
          isValid = false;
        }
      }
  
    if (!formData.image) {
      newErrors.image = 'Book file is required';
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

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('book', JSON.stringify(formData));
      formDataToSend.append('image', formData.image);

      const response = await axios.post('https://backendexpressjsback.onrender.com/book/add-book', formDataToSend);
      toast.success('The book has been added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      toast.eroor('error adding the book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="name" className={`form-control ${errors.name && 'is-invalid'}`} placeholder="Book Name" value={formData.name} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <input type="text" name="description" className={`form-control ${errors.description && 'is-invalid'}`} placeholder="Book Description" value={formData.description} onChange={handleChange} />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="mb-3">
          <input type="number" name="price" className={`form-control ${errors.price && 'is-invalid'}`} placeholder="Book Price" value={formData.price} onChange={handleChange} />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
        <div className="mb-3">
          <input type="text" name="author" className={`form-control ${errors.author && 'is-invalid'}`} placeholder="Author" value={formData.author} onChange={handleChange} />
          {errors.author && <div className="invalid-feedback">{errors.author}</div>}
        </div>
        <div className="mb-3">
          <select name="level" className={`form-control ${errors.level && 'is-invalid'}`} value={formData.level} onChange={handleChange}>
            <option value="">Select Level</option>
            {[...Array(7).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
          {errors.level && <div className="invalid-feedback">{errors.level}</div>}
        </div>
        <div className="mb-3">
          <input type="file" name="image" className={`form-control ${errors.image && 'is-invalid'}`} onChange={handleFileChange} />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Book'}</button>
      </form>
    </div>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
    
  );
}

export default AddBookForm;
