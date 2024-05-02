import { useState, useEffect } from 'react';
import axios from 'axios';

function UserNotes() {
    const userId = localStorage.getItem('id');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchUserNotes = async () => {
            try {
                const response = await axios.get(`https://backendexpressjs-2.onrender.com/courses/notes/${userId}`);
                setNotes(response.data.notes);
            } catch (error) {
                console.error('Error fetching user notes:', error);
            }
        };

        fetchUserNotes();
    }, [userId]);

    return (
        <div className="container mt-4" style={{ height: '600px', overflowY: 'auto' }}>
            <br />
            <br />
            <br />
            <br />
            {notes.length === 0 ? (
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<img width="96" height="96" src="https://img.icons8.com/color/96/report-card.png" alt="report-card"/>        <p>Sorry, you don't have any marks yet.</p>
   </div>            ) : (
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
            )}
        </div>
    );
}

export default UserNotes;
