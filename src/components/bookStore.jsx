import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NotPaid from './subscription/NotPaid';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const userId = localStorage.getItem('id');
  const [decodedToken,setDecodedToken]= useState('');
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

  const handleBuyBook = async (bookId) => {
    try {
      await axios.put(`http://localhost:3000/book/buy-book/${bookId}/${userId}`);
      setUserBooks([...userBooks, bookId]); // Add the newly bought book to the user's books
    } catch (error) {
      console.error('Error buying book:', error);
      alert('Failed to buy book. Please try again.');
    }
  };

  return (
    <>
      {decodedToken.role=="Student" &&  decodedToken.paid === false ? (
       <NotPaid></NotPaid>

      ) : (
        <>
    <br />
  <br />
  <br />

  <br />
  
    <div style={styles.bookListContainer}>
      <h1 style={styles.bookListTitle}>Book List</h1>
      <ul style={styles.bookList}>
        {books.map(book => (
          <li key={book._id} style={styles.bookItem}>
            <div>
              <h2>{book.bookName}</h2>
              <p>{book.bookDescription}</p>
              <p>Price: ${book.bookPrice}</p>
              <p>Author: {book.author}</p>
              {isBookOwned(book._id) ? (
                <p>Owned</p>
              ) : (
                <button onClick={() => handleBuyBook(book._id)} style={styles.buyButton}>Buy Book</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
      )}
    </>
    
  );
};

const styles = {
  bookListContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
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
  },
  bookItem: {
    marginBottom: '30px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  bookDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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
