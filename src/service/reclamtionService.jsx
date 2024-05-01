import axios from 'axios';
const BASE_URL =  'http://localhost:3000/Reclamtions'; 
const reclamtionService ={
    async addreclamation(reclamation) {
        try {
          const token = localStorage.getItem('userToken'); 
          const response = await axios.post(`${BASE_URL}/addreclamation`, reclamation, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message); 
        }
      },
      async GetReclamationsForUser(email) {
        try {
          const token = localStorage.getItem('userToken'); 
          const response = await axios.get(`${BASE_URL}/Allreclamtions/${email}`, {
            headers: { Authorization: `Bearer ${token}` }, 
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message); 
        }
      },
      async getAllReclamations() {
        try {
          const token = localStorage.getItem('userToken'); 
          const response = await axios.get(`${BASE_URL}/Allreclamtions`, {
            headers: { Authorization: `Bearer ${token}` }, 
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message); 
        }
      },
      async deletereclamtion(id) {
        try {
          const token = localStorage.getItem('userToken'); 
          await axios.delete(`${BASE_URL}/DeleteOneReclamation/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, 
          });
        } catch (error) {
          throw new Error(error.message); 
        }
      },
      async updatereclamation(reclamation) {
        try {
          const token = localStorage.getItem('userToken'); 
          const response = await axios.post(`${BASE_URL}/updateReclamation`, reclamation, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message); 
        }
      },

      async resolving(id,resp) {
        try {
          const token = localStorage.getItem('userToken'); 
          const response = await axios.post(`${BASE_URL}/resolving/${id}`,{ resp }, 
          {
              headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message); 
        }
      }
    
};
export default reclamtionService;