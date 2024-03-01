import axios from 'axios';


const BASE_URL =  'http://localhost:3000/users'; 

const userService = {
    async login(email, password) {
        try {
          const response = await axios.post(`${BASE_URL}/login`, { email, password });
      
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            localStorage.setItem('email', email);
            
            return token;
          }
          
          else if (response.status === 401) {
            throw new Error('Email ou mot de passe incorrect.');
          } else if (response.status === 403) {
            throw new Error('Accès refusé. Veuillez contacter l\'administrateur.');
          } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer.');
          }
        } catch (error) {
            throw new Error(error.message);
        }
      },

  // Get all users (requires admin privileges)
  async getAllUsers() {
    try {
      const token = localStorage.getItem('userToken'); 
      const response = await axios.get(`${BASE_URL}/AllUsers`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve users.'); 
    }
  },

  // Get one user by email
  async getUser(email) {
    try {
      const token = localStorage.getItem('userToken'); 
      const response = await axios.get(`${BASE_URL}/OneUser/${email}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve user.'); 
    }
  },

  // Create a new user
  async register(user) {
    try {
        const response = await axios.post(`${BASE_URL}/register`, user, {
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          });
          return response.data;
    } catch (error) {
      throw new Error(error.message); 
    }
  },

  // Update user (requires authentication)
  async updateUser(email, updatedUser) {
    try {
      const token = localStorage.getItem('userToken'); 
      const response = await axios.patch(`${BASE_URL}/UpdatingUser/${email}`, updatedUser, {
        headers: {'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) {
      throw new Error('Update failed. Please try again.'); 
    }
  },

  // Delete user (requires admin privileges)
  async deleteUser(email) {
    try {
      const token = localStorage.getItem('userToken'); 
      await axios.delete(`${BASE_URL}/DeleteOneUser/${email}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
    } catch (error) {
      throw new Error('Delete failed. Please try again.'); 
    }
  },
   logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('email');
    
  }
};

export default userService;