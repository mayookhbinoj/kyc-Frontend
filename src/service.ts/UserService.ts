import axios from "axios";
import { kycSubmit, LoginFormData } from "../Interfaces/forms";    
const API_URL ='http://localhost:5001/api/user'
axios.defaults.withCredentials=true
const apiservice=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }  
})

const apiserviceMethood = {
    register: (url: string, data: LoginFormData) => {
      return apiservice.post(url, data);
    },
    userLogin: (url: string, data: LoginFormData) => {
      return apiservice.post(url, data);
    },
    kycSubmit: (url: string, data: kycSubmit) => {
      return apiservice.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    logout: (url: string) => {
      return apiservice.get(url);
    },
  };
  

export default apiserviceMethood