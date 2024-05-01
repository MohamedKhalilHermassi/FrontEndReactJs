import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NotPaid from './subscription/NotPaid';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const userId = localStorage.getItem('id');
  const [decodedToken, setDecodedToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setDecodedToken(jwtDecode(token));
    }
    
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/book/get-books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/get-my-books/${userId}`);
        setUserBooks(response.data.books.map(book => book._id));
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  const isBookOwned = (bookId) => {
    return userBooks.includes(bookId);
  };

  const handleBuyBook = async (bookprice,bookid) => {

   

    localStorage.setItem('bookId',bookid)
    await axios.post('http://localhost:3000/payement/floucibook',{amount:bookprice})
    .then((result)=>{
      console.log(result.data)
      window.location.replace(result.data.result.link); 
      
    }).catch((err)=>console.log(err));
  };

  return (
    <>
    <br />
      {decodedToken.role === "Student" && decodedToken.paid === false ? (
        <NotPaid />
      ) : (
        <div style={styles.marketplaceContainer}>
          <div style={styles.bookListContainer}>
            <h1 style={styles.bookListTitle}>Book List</h1>
            <ul style={styles.bookList}>
              {books.map(book => (
                <li key={book._id} style={styles.bookItem}>
                  <div style={styles.bookItemContent}>
                    <img width={150} src="https://cdn3d.iconscout.com/3d/premium/thumb/book-9492860-7767263.png" alt="" style={styles.bookImage} />
                    <div style={styles.bookDetails}>
                      <h2 style={styles.bookName}>{book.bookName}</h2>
                      <p style={styles.bookDescription}>{book.bookDescription}</p>
                      <p style={styles.bookInfo}>Price: {book.bookPrice} TND</p>
                      <p style={styles.bookInfo}>Author: {book.Author}</p>
                      {isBookOwned(book._id) ? (
                        <p style={styles.ownedLabel}>Owned</p>
                      ) : (
                        <button onClick={() => handleBuyBook((book.bookPrice)*1000,book._id)} style={styles.buyButton}>Buy Book</button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  marketplaceContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  bookListContainer: {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '20px',
  },
  bookListTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    textTransform: 'uppercase',
  },
  bookList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bookItem: {
    margin: '0 10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    flex: '0 1 calc(33.333% - 20px)', // Adjust the width of each book item
    minWidth: '250px', // Minimum width for each book item
    boxSizing: 'border-box',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  bookItemContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  bookImage: {
    marginBottom: '20px',
  },
  bookDetails: {
    textAlign: 'center',
  },
  bookName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  bookDescription: {
    marginBottom: '10px',
    color: '#666',
  },
  bookInfo: {
    marginBottom: '10px',
    color: '#666',
  },
  buyButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  ownedLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
};

export default BookList;
