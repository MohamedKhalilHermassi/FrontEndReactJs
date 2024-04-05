import axios from "axios";
import toast from "react-hot-toast";

const endPoint = import.meta.env.VITE_APIURL+'locations/';

export async function fetchLocations() {
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching locations: ${error.message}`);
    }
}

export async function fetchLocationById(id) {
    try {
        const response = await axios.get(endPoint+id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching location: ${error.message}`);
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
        throw new Error(`Error adding location: ${error.message}`);
    }
}