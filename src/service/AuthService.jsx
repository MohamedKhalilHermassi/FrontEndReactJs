import { jwtDecode } from "jwt-decode";
const AuthService = {
   
    isTokenExpired: (token) => {
        if (!token) {
            return true;
          }
      
          try {
            const decodedToken = jwtDecode(token);
            const expirationDate = decodedToken.exp * 1000;
            return expirationDate < Date.now();
          } catch (error) {
            return true; 
          }
    },
  
    
   
    hasPermission: (token, requiredRole) => {
        if (!token) {
          return false; 
        }
    
        try {
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role; 
          return userRole === requiredRole; 
        } catch (error) {
          return false; 
        }
      },
   
    logout: () => {
      
        localStorage.removeItem('userToken');
        localStorage.removeItem('email');
     
    },
  };
  
  export default AuthService;
  