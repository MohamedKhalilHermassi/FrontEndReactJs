import  { useState, useEffect } from 'react';
import axios from 'axios';

function UserNotes() {
    const userId = localStorage.getItem('id');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchUserNotes = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/courses/notes/${userId}`);
                setNotes(response.data.notes);
            } catch (error) {
                console.error('Error fetching user notes:', error);
            }
        };

        fetchUserNotes();
    }, [userId]);

    return (
        <>
    
        <br />
        <br />

        <br />

        <br />

         <div className="container mt-4">
            <h2 className="mb-4">My Marks</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={index}>
                            <td>{note.courseName}</td>
                            <td>{note.mark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        
        </>
       
    );
}

export default UserNotes;
