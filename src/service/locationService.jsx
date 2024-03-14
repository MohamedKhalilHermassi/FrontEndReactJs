import axios from "axios";
import toast from "react-hot-toast";

const endPoint = import.meta.env.VITE_APIURL+'locations/';

export async function fetchLocations() {
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

export async function addLocation(location){
    try{
            const response = await axios.post(endPoint, location);
            toast.success('Location added successfully!',
            {
              style:{
                width:'500px',
                height:'50px'
              },
              duration: 2000
            }
            )
    return response.data
    } catch(error){
        throw new Error(`Error adding course: ${error.message}`);
    }
}