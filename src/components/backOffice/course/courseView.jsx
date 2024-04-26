import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useParams } from "react-router-dom";
import "./courseView.css"; // Import the combined CSS file for styling

const CourseView = () => {
  const { courseid } = useParams();
  const [selected, setSelected] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    // Fetch course data from the backend API
    fetch(`https://backendexpressjsback.onrender.com/courses/${courseid}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
        // Update selected state with the names of the students from the course data
        setSelected(data.students.map((student) => ({ id: student._id, fullname: student.fullname })));
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });

    // Fetch student list from the backend API
    fetch(`https://backendexpressjsback.onrender.com/users/students`)
      .then((response) => response.json())
      .then((data) => {
        // Filter student list to include only students not enrolled in the current course
        const filteredStudentList = data.filter(
          (student) => !student.courses.find((c) => c.course === courseid)
        );
        setStudentList(filteredStudentList);
      })
      .catch((error) => {
        console.error("Error fetching student list:", error);
      });
  }, [courseid]); // Trigger the effect whenever courseid changes

  // Update suggestions based on the current input value
  const handleInputChange = (value) => {
    const filteredSuggestions = studentList
      .filter((student) =>
        student.fullname.toLowerCase().includes(value.toLowerCase())
      )
      .map((student) => ({ id: student._id, fullname: student.fullname }));
    setSuggestions(filteredSuggestions);
  };

  // Handle adding a new student to the course
  const handleAddStudent = () => {
    if (selectedUser) {
      // Check if the selected student is already enrolled in the course
      const isEnrolled = courseData.students.some((student) => student._id === selectedUser);
      if (isEnrolled) {
        // Set error message for duplicate enrollment
        setMessage({ type: "error", content: "Student is already enrolled in this course." });
        return;
      }

      // Make PUT request to enroll the student in the course
      fetch(`https://backendexpressjsback.onrender.com/courses/enroll/${courseid}/${selectedUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the response message
          // Add the selected student to the list of enrolled students
          setSelected([...selected, { id: selectedUser, fullname: studentList.find(student => student._id === selectedUser).fullname }]);
          setSelectedUser(""); // Clear the selected user
          // Set success message for successful enrollment
          setMessage({ type: "success", content: "Student enrolled successfully." });
          // Remove the success message after 3 seconds
          setTimeout(() => setMessage({ type: "", content: "" }), 3000);
        })
        .catch((error) => {
          console.error("Error enrolling student:", error);
          // Set error message for enrollment error
          setMessage({ type: "error", content: "Error enrolling student. Please try again." });
          // Remove the error message after 3 seconds
          setTimeout(() => setMessage({ type: "", content: "" }), 3000);
        });
    }
  };

  return (
    <div className="course-view-container">
      {courseData && (
        <div className="course-details">
          <h2 className="course-name">{courseData.name}</h2>
          <p className="course-description">{courseData.description}</p>
        </div>
      )}
      <div className="students-section">
        {/* Display message component */}
        {message.content && (
          <div className={`message ${message.type}`}>
            <span>{message.content}</span>
          </div>
        )}
        <h3 className="students-heading">Students</h3>
        <TagsInput
          value={selected.map(student => student.fullname)}
          onChange={(value) =>
            setSelected(
              value.map((studentName) => ({
                id: studentList.find((student) => student.fullname === studentName)?._id,
                fullname: studentName,
              }))
            )
          }          name="students"
          placeHolder="Enter student names"
          className="tags-input"
          suggestions={suggestions.map(student => student.fullname)}
          onInputChange={handleInputChange}
          autocomplete
        />
        <em className="instruction">
          Press enter or comma to add new student
        </em>
        <div className="add-student-section">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="user-select"
          >
            <option value="">Select User</option>
            {studentList.map((student) => (
              <option key={student?._id} value={student?._id}>
                {student.fullname}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddStudent}
            className="add-button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
