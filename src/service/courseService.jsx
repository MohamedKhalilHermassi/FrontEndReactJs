import axios from "axios";
import toast from "react-hot-toast";

const endPoint = import.meta.env.VITE_APIURL+'courses/';

export async function fetchCourses() {
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function fetchCourseById(id) {
    try {
        const response = await axios.get(endPoint+id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function deleteCourse(courseId){
    try{
        const response = await axios.delete(endPoint+courseId);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting course: ${error.message}`);
    }
}

export async function addCourse(course){
    let response;
    try{
        if (course.get('_id')) {
            response = await axios.put(endPoint+course.get('_id'), course);
            toast.success('Course updated successfully!',
            {
              style:{
                width:'500px',
                height:'50px'
              },
              duration: 2000
            }
            )
        }else{
            response = await axios.post(endPoint+'add', course);
            toast.success('Course added successfully!',
            {
              style:{
                width:'500px',
                height:'50px'
              },
              duration: 2000
            }
            )
    }
    return response.data
    } catch(error){
        throw new Error(`Error adding course: ${error.message}`);
    }
}

export async function enrollement(courseId, studentId) {
    try {
        const response = await axios.put(`${endPoint}enroll/${courseId}/${studentId}`);
        toast.success('Enrolled successfully!',
        {
          style:{
            width:'500px',
            height:'50px'
          },
          duration: 2000
        }
        )
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function fetchCourseByStudentId(studentId){
    try {
        const response = await axios.get(`${endPoint}/coursesByStudent/${studentId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function fetchCourseByTeacherId(teacherId){
    try {
        const response = await axios.get(`${endPoint}/coursesByTeacher/${teacherId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}