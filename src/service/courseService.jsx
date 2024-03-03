import axios from "axios";

const endPoint = import.meta.env.VITE_APIURL+'courses/';

export async function fetchCourses() {
    try {
        const response = await axios.get(endPoint);
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
    try{
        const response = await axios.post(import.meta.env.VITE_APIURL+'courses/add', course);
        return response.data
    } catch(error){
        throw new Error(`Error adding course: ${error.message}`);
    }
}