
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { addNoteProduct, fetchNotes, updateNote } from '../service/noteService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

function ProductDetails() {
  const [userId, setUserId] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState(null);
  const [hover, setHover] = useState({});
  const [notes, setNotes] = useState([]);
  const {id} = useParams();

  const fetchProductById = async (id) =>{
    try{
    const response = await axios.get(`https://backendexpressjs-2.onrender.com/market/getproductbyid/${id}`);
    console.log(response.data);
    setProduct(response.data);
    setProducts(response.data.produitsSimilaires);
    }
    catch(error){
      console.error(error);
    }
  }

  const getNotes = async () => {
    const notesData = await fetchNotes();
    console.log(notesData);
    setNotes(notesData);
}

const toggleCart = () => {
  setShowCart(!showCart);
};

const handleOrder = async () => {
  try {
    const productsList = cartItems.flatMap(item => Array.from({ length: item.quantity }, () => item._id));
    
    const response = await axios.post('https://backendexpressjs-2.onrender.com/orders/add-order', {
        totalPrice: totalPrice,
        user: localStorage.getItem('id'),
        products: productsList,
    });
    toast.success('Your order has been placed successfully!');
    setCartItems([]);
    setTotalPrice(0);
    setShowCart(false); 
  } catch (error) {
    console.error('Error placing order:', error);
    toast.error('Failed to place order. Please try again later.');
  }
};

const addToCart = (product) => {
  const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

  if (existingItemIndex !== -1) {
    // Product already exists in cart, do nothing
    return;
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    setTotalPrice(totalPrice + product.productPrice);
    setTotalItems(totalItems + 1);
  }
};

const removeFromCart = (productId) => {
  const updatedCart = cartItems.filter(item => item._id !== productId);
  const removedItem = cartItems.find(item => item._id === productId);
  setCartItems(updatedCart);
  setTotalPrice(totalPrice - removedItem.productPrice * removedItem.quantity);
  setTotalItems(totalItems - removedItem.quantity);
};

const handleMouseEnter = (productId, rating) => {
  setHover(prev => ({ ...prev, [productId]: rating }));
};

// Function to handle mouse leaving a star
const handleMouseLeave = (productId) => {
  setHover(prev => ({ ...prev, [productId]: null }));
};

  useEffect( ()=>{
    console.log(id);
    const token = localStorage.getItem('userToken');
    if(token){
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.id);
    }
    fetchProductById(id);
    getNotes();
  },[]);

  return (
<div className='mt-5'>
  {/* content */}
  <section className="py-5">
    <div className="container">
      <div className="row gx-5">
        <aside className="col-lg-6">
          <div className="border rounded-4 mb-3 d-flex justify-content-center">
            <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" >
              <img style={{maxWidth: '100%', maxHeight: '100vh', margin: 'auto'}} className="rounded-4 fit" src={`https://backendexpressjs-2.onrender.com/uploads/${product?.filename}`} />
            </a>
          </div>
          {/* thumbs-wrap.// */}
          {/* gallery-wrap .end// */}
        </aside>
        <main className="col-lg-6">
          <div className="ps-lg-3">
            <h4 className="title text-dark">
              {product?.productName}
            </h4>
            <div className="d-flex flex-row my-3">
            {[...Array(5)].map((star, index) =>{
                  const currentRating = index+1;
                  return (<label>
                    <input 
                    type="radio" 
                    name="rating"
                    value={currentRating}
                    onClick={async()=> {
                      const rate = {userid: userId, productid: product?._id, note: currentRating};
                      console.log(rate);
                      if(notes.some((n)=> n.userid === userId && n.productid === product?._id)){
                        await updateNote(rate,notes.filter((n)=> n.userid == userId && n.productid == product?._id)[0]._id);
                      }
                      await addNoteProduct(rate);
                      getNotes();
                      }} />
                    <FaStar className='star ' size={35} color={currentRating <= (hover[product?._id] || notes.filter((n)=> n.userid == userId && n.productid == product?._id)[0]?.note) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => handleMouseEnter(product?._id, currentRating)} onMouseLeave={() => handleMouseLeave(product?._id)}/>
                  </label>);
                })}
              {product?.sold === false?
              <span className="text-success ms-2">Available</span>
              :
              <span className="text-danger ms-2">Sold</span>
              }
            </div>
            <div className="mb-3">
              <span className="h5">{product?.productPrice} TND</span>
            </div>
            <p>
              {product?.productDescription}
            </p>
            <hr />
                            <button 
                  className="btn btn-primary" 
                  onClick={() => {addToCart(product);}} 
                  disabled={cartItems.some(item => item._id === product._id)}
                >
                  <i className="me-1 fa fa-shopping-basket" />
                  {cartItems.some(item => item._id === product._id) ? "Added to Cart" : "Add to Cart"}
                </button>
          </div>
        </main>
      </div>
    </div>
  </section>
  {/* content */}
  <section className="bg-light border-top py-4">
    <div className="container">
      <div className="row gx-4">
      <h2 className="my-5">Similar Products</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100">
              <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                <img src={`https://backendexpressjs-2.onrender.com/uploads/${product.filename}`} className="card-img-top" alt={product.productName} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <h6>{product.productPrice} TND</h6>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {addToCart(product);}} 
                  disabled={cartItems.some(item => item._id === product._id)}
                >
                  <i className="me-1 fa fa-shopping-basket" />
                  {cartItems.some(item => item._id === product._id) ? "Added to Cart" : "Add to Cart"}
                </button>
                <button type="button" class="btn btn-info" onClick={()=>{navigate(`/marketplace/details/${product._id}`)}}>View Details</button>
                <br />
                {[...Array(5)].map((star, index) =>{
                  const currentRating = index+1;
                  return (<label>
                    <input 
                    type="radio" 
                    name="rating"
                    value={currentRating}
                    onClick={async()=> {
                      const rate = {userid: userId, productid: product._id, note: currentRating};
                      console.log(rate);
                      if(notes.some((n)=> n.userid === userId && n.productid === product._id)){
                        await updateNote(rate,notes.filter((n)=> n.userid == userId && n.productid == product._id)[0]._id);
                      }
                      await addNoteProduct(rate);
                      getNotes();
                      }} />
                    <FaStar className='star mt-3' size={35} color={currentRating <= (hover[product._id] || notes.filter((n)=> n.userid == userId && n.productid == product._id)[0]?.note) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => handleMouseEnter(product._id, currentRating)} onMouseLeave={() => handleMouseLeave(product._id)}/>
                  </label>);
                })}
              </div>
            </div>
          </div>
        ))}
        
      </div>
      </div>
    </div>
  </section>
  <div style={floatingCartStyle} onClick={toggleCart}>
        <FaShoppingCart />
        <span style={cartCountStyle}>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      </div>
      {showCart && (
       <div style={cartDropdownStyle}>
       <h4>Shopping Cart</h4>
       <div style={cartListStyle}>
         <ul>
           {cartItems.map(item => (
             <li key={item._id}>
               <div>
                 <img src={`https://backendexpressjs-2.onrender.com/uploads/${item.filename}`} alt={item.productName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                 <span>{item.productName} - {item.productPrice} TND - Quantity: {item.quantity}</span>
                 <RiCloseCircleLine className="text-danger" style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item._id)} />

               </div>
             </li>
           ))}
         </ul>
       </div>
       <p>Total Price: {totalPrice} TND</p>
       <button className="btn btn-primary" onClick={handleOrder}>Order</button>
     </div>
      )}
</div>

  )
}

export default ProductDetails

const floatingCartStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const cartCountStyle = {
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  backgroundColor: 'red',
  color: '#fff',
  padding: '5px 8px',
  borderRadius: '50%',
};

const cartDropdownStyle = {
  position: 'fixed',
  bottom: '100px',
  right: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  maxHeight: '300px',
  overflowY: 'auto',
};

const cartListStyle = {
  maxHeight: '240px',
  overflowY: 'auto',
};