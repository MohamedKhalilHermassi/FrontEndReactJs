import { useState } from 'react';
import axios from 'axios';

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

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
    {successMessage && <div className="alert alert-success">
        
        <div className='text-green'>
            <strong>        {successMessage}</strong>

        </div>
        </div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" name="name" className="form-control" placeholder="Product Name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input type="text" name="description" className="form-control" placeholder="Product Description" value={formData.description} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input type="number" name="price" className="form-control" placeholder="Product Price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input type="text" name="condition" className="form-control" placeholder="Product Condition" value={formData.condition} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input type="file" name="image" className="form-control" onChange={handleFileChange} />
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
      <h1 className='mt-5'>Thanks for choosing to become a seller !</h1>

      <div className='d-flex justify-content-center'>
  <img height={250} width={250} src="https://i.pinimg.com/originals/17/09/0b/17090b01dc64aae1891a99db12af2d7b.gif" alt="" />
</div>
    </div>
    </>
  );
}

export default AddProductForm;
