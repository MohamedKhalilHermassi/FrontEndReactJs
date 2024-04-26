import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentsList() {
    const { courseId } = useParams();
    const [students, setStudents] = useState([]);
    const [mark, setMark] = useState('');
    const [course, setCourse] = useState(null);
    const [courseName, setCourseName] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://backendexpressjsback.onrender.com/courses/${courseId}`);
                setCourse(response.data);
                setCourseName(response.data.name); // Saving course name
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, []);
    
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`https://backendexpressjsback.onrender.com/courses/students-of-course/${courseId}`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [courseId]);

    const hasNoteForCourse = (student) => {
        if (student.notes && student.notes.length > 0) {
            return student.notes.some(note => note.courseName === courseName);
        }
        return false;
    };

    const getNoteForCourse = (student) => {
        if (student.notes && student.notes.length > 0) {
            const note = student.notes.find(note => note.courseName === courseName);
            return note ? note.mark : '';
        }
        return '';
    };

    const handleAddNote = async (studentId) => {
        try {
            await axios.put(`https://backendexpressjsback.onrender.com/courses/add-note/${studentId}`, { courseName, mark });
            // Refresh students list after adding note
            const response = await axios.get(`https://backendexpressjsback.onrender.com/courses/students-of-course/${courseId}`);
            setStudents(response.data);
            setMark(''); // Reset mark input after adding note
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleChat = () => {
        navigate(`/chat`); // Navigate to chat component with studentId as parameter
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Students List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id}>
                            <td>{index + 1}</td>
                            <td>{student.fullname}</td>
                            <td>{student.email}</td>
                            <td>
                                {hasNoteForCourse(student) ? getNoteForCourse(student) : (
                                    <input
                                        type="number"
                                        value={mark}
                                        onChange={(e) => setMark(e.target.value)}
                                        placeholder="Enter mark"
                                    />
                                )}
                            </td>
                            <td>
                                {!hasNoteForCourse(student) && (
                                    <button onClick={() => handleAddNote(student._id)} className="btn btn-primary">Add Note</button>
                                )}
                                <button onClick={() => handleChat()} className="btn btn-secondary">Chat</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsList;
