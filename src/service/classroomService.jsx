import axios from "axios";
import toast from "react-hot-toast";

const endPoint = import.meta.env.VITE_APIURL+'classrooms/';

export async function addClassroom(classroom){
    try{
            const response = await axios.post(endPoint, classroom);
            toast.success('Classroom added successfully!',
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
        throw new Error(`Error adding classroom: ${error.message}`);
    }
}

export async function getClassroomByLocationId(locationId){
  try{
    const response = await axios.get(`${endPoint}/${locationId}`);
    return(response.data)
  }
  catch(error){
    throw new Error(`Error adding classroom: ${error.message}`);
}
}

export async function available(id){
  try{
    const response = await axios.put(`${endPoint}/available/${id}`);
    return(response.data);
  }catch(error){
    throw new Error(`Error updating classroom status: ${error.message}`);
  }
}

export async function maintenance(id){
  try{
    const response = await axios.put(`${endPoint}/maintenance/${id}`);
    return(response.data);
  }catch(error){
    throw new Error(`Error updating classroom status: ${error.message}`);
  }
}