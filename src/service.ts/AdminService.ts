import axios from "axios";
const API_URL ='http://localhost:5001/api/admin'
axios.defaults.withCredentials=true
const apiservice=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }  
})
const adminService = {
    getUser: (url: string, ) => {
          return apiservice.get(url);
        },
    approveKyc: (url: string,id:{id:string} ) => {
          return apiservice.patch(url,id);
        },
    rejectKyc: (url: string,id:{id:string} ) => {
          return apiservice.patch(url,id);
        },
    logout: (url: string) => {
            return apiservice.get(url);
          },
}
  

export default adminService