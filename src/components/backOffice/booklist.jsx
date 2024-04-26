import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://backendexpressjsback.onrender.com/book/get-books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`https://backendexpressjsback.onrender.com/book/delete-book/${id}`);
      setBooks(books.filter(book => book._id !== id));
      setSelectedBook(null); // Clear selected book if deleted
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Author</th>
                <th>Level</th>
                <th>Actions</th> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id} onClick={() => handleBookSelect(book)} style={{ cursor: 'pointer' }}>
                  <td>{book.bookName}</td>
                  <td>{book.bookDescription}</td>
                  <td>{book.bookPrice}</td>
                  <td>{book.Author}</td>
                  <td>{book.level}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                  </td> {/* Add delete button */}
                </tr>
              ))}
            </tbody>
          </table>
          {selectedBook && (
            <div className="mt-3">
              <h3>{selectedBook.bookName}</h3>
              <iframe
                src={`https://backendexpressjsback.onrender.com/uploads/${selectedBook.filename}`}
                width="100%"
                height="600px"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;
