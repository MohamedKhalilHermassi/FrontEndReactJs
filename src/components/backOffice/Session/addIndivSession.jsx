import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateIndivSessions() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [matchingAvailableTimes, setMatchingAvailableTimes] = useState([]);
    const [confirmSessionVisible, setConfirmSessionVisible] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch student data
        fetch('https://backendexpressjs-2.onrender.com/users/students')
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
            .catch(error => console.error('Error fetching students:', error));

        // Fetch course data
        fetch('https://backendexpressjs-2.onrender.com/courses')
            .then(response => response.json())
            .then(data => {
                // Filter courses of type "Instrument" and extract course details
                const instrumentCourses = data.filter(course => course.courseType === 'Instrument');
                setCourses(instrumentCourses);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleCourseSelection = async (event) => {
        const selectedId = event.target.value;
        setSelectedCourseId(selectedId);

        // Fetch the selected course details to get the teacher's name
        const response = await fetch(`https://backendexpressjs-2.onrender.com/courses/${selectedId}`);
        const data = await response.json();

        // Extract the teacher's name and ID from the selected course object
        if (data.teacher && data.teacher.fullname) {
            setTeacherName(data.teacher.fullname);
            setTeacherId(data.teacher._id);
        } else {
            setTeacherName('');
            setTeacherId('');
        }

        // Set the selected course name
        setSelectedCourseName(data.name);
    };

    const handleCreateSession = async () => {
        try {
            console.log("teacher id : ", teacherid);
            const responseSession = await fetch(`https://backendexpressjs-2.onrender.com/users/match-available-time/${selectedStudentId}/${teacherid}`);
            const sessionData = await responseSession.json();

            console.log('Matching available times:', sessionData.matchingAvailableTimes);

            // Set matching available times to state
            setMatchingAvailableTimes(sessionData.matchingAvailableTimes);
            setConfirmSessionVisible(true);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };
    const handleConfirmSession = async () => {
        try {
            const selectedTime = matchingAvailableTimes.find(time => time._id === selectedTimeSlot);
            console.log('Selected Time:', selectedTime);
    
            if (!selectedTime) {
                console.error('No matching time slot selected');
                return;
            }
    
            // Get current date
            const currentDate = new Date();
    
            // Get the selected day
            const selectedDay = selectedTime.day;
    
            // Find the next occurrence of the selected day in the current week
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDayIndex = daysOfWeek.indexOf(selectedDay);
            const daysUntilNextOccurrence = currentDayIndex - currentDate.getDay() + (currentDayIndex < currentDate.getDay() ? 7 : 0);
            const nextOccurrenceDate = new Date(currentDate);
            nextOccurrenceDate.setDate(currentDate.getDate() + daysUntilNextOccurrence);
    
            // Split the start time into hours and minutes
            const [hours, minutes] = selectedTime.startTime.split(':').map(Number);
    
            // Set the start date with the calculated date and time
            const startDate = new Date(nextOccurrenceDate);
            startDate.setUTCHours(hours, minutes, 0, 0);
    
            console.log('Start Date:', startDate);
    
            const requestBody = {
                startDate: startDate.toISOString(),
                duree: 30, // Assuming duration is fixed to 30 minutes
                course: selectedCourseId,
                teacher: teacherid,
                classroom: '6623dc779dad2cdc969e54f6', // Sample classroom ID
                level: 0 // Sample level
            };
    
            console.log('Request Body:', requestBody);

            const response = await fetch(`https://backendexpressjs-2.onrender.com/sessions/addindiv/${selectedStudentId}/${teacherid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response.ok) {
                console.log('Session successfully created');
                navigate('/admin/ListS');

            } else {
                console.error('Failed to create session');
            }

        } catch (error) {
            console.error('Error creating session:', error);
        }
    };
    

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6">
                    <label htmlFor="studentSelect" className="form-label">Select a Student:</label>
                    <select id="studentSelect" className="form-select mb-3" onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
                        <option value="">Select a student</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>{student.fullname}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="courseSelect" className="form-label">Select an Instrument Course:</label>
                    <select id="courseSelect" className="form-select mb-3" onChange={handleCourseSelection} value={selectedCourseId}>
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    {selectedCourseName && (
                        <div>
                            <p>Teacher of {selectedCourseName}:</p>
                            <p>{teacherName}</p>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <button onClick={handleCreateSession} className="btn btn-primary">Check for matching availability</button>
                </div>
            </div>

            {matchingAvailableTimes.length > 0 && (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p>Matching Available Times:</p>
                        {matchingAvailableTimes.map((time) => (
                            <div key={time._id} className="form-check">
                                <input className="form-check-input" type="checkbox" name="matchingTime" id={time._id} value={time._id} onChange={() => setSelectedTimeSlot(time._id)} />
                                <label className="form-check-label" htmlFor={time._id}>
                                    {time.day}: {time.startTime} - {time.endTime}
                                </label>
                            </div>
                        ))}
                        {confirmSessionVisible && (
                            <button onClick={handleConfirmSession} className="btn btn-success mt-3">Confirm Session</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateIndivSessions;