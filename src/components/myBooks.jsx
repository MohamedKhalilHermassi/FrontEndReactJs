import { useState, useEffect } from 'react';
import axios from 'axios';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem('id');
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/get-my-books/${userId}`);
        // Filter out duplicate books based on _id
        const uniqueBooks = response.data.books.filter((book, index, self) =>
          index === self.findIndex((b) => (
            b._id === book._id
          ))
        );
        setBooks(uniqueBooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    fetchBooks();
  }, [userId]);

  const openPDF = (pdfUrl) => {
    setSelectedBook(pdfUrl);
  };

  const closePDF = () => {
    setSelectedBook(null);
  };

  return (
    <>
   <br />
   <br />
   <br />
    <div style={styles.bookListContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>You haven't bought any books yet.</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Author</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td>{book.bookName}</td>
                  <td>{book.bookDescription}</td>
                  <td>{book.bookPrice} TND</td>
                  <td>{book.Author}</td>
                  <td>
                    <button
                      onClick={() => openPDF(`http://localhost:3000/uploads/${book.filename}`)}
                      style={styles.readButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedBook && (
            <div>
              <button onClick={closePDF} style={styles.closeButton}>Close PDF</button>
              <iframe src={selectedBook} style={styles.iframe}></iframe>
            </div>
          )}
        </div>
      )}
    </div>
    <br />
    <br />
    <br />
    <br />
    <br /><br /><br />
    <br />
    <br /><br /><br /><br /><br />
    <br />
    <br />
    <br />
    </>
  );
};

const styles = {
  readButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s',
  },
  bookListContainer: {
    
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  bookListTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px 15px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px 15px',
    textAlign: 'left',
  },
  iframe: {
    width: '100%',
    height: '1000px',
    marginTop: '20px',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    marginRight: '10px',
  },
};

export default MyBooks;
