import axios from "axios";

const endPoint = import.meta.env.VITE_APIURL+'notes/';

export async function fetchNotes(){
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function addNoteProduct(note){
    try{
        const response = await axios.post(`${endPoint}addproductnote`, note);
        return response.data;
    }catch(error){
        throw new Error(`Error adding product note: ${error.message}`);
    }
}

export async function addNoteBook(note){
    try{
        const response = await axios.post(`${endPoint}/addbooknote`, note);
        return response.data;
    }catch(error){
        throw new Error(`Error adding product note: ${error.message}`);
    }
}

export async function addNoteCourse(note){
    try{
        const response = await axios.post(`${endPoint}/addcoursenote`, note);
        return response.data;
    }catch(error){
        throw new Error(`Error adding product note: ${error.message}`);
    }
}

export async function updateNote(note, id){
    try{
        const response = await axios.put(`${endPoint}/updatenote/${id}`,note);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating note: ${error.message}`);
    }
}