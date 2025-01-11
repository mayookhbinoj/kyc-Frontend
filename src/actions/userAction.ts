import { createAsyncThunk } from "@reduxjs/toolkit";
import apiserviceMethood from "../service.ts/UserService";
import { kycSubmit, LoginFormData } from "../Interfaces/forms";
import toast from "react-hot-toast";


export const registerUser=(createAsyncThunk("auth/register",async(data:LoginFormData,{rejectWithValue})=>{
    try {
        const response=await apiserviceMethood.register("/register",data)
        console.log(data)
        if (response.data && response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          return response.data;
    } catch (error:any) {
      
        if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
        
    }

}))
export const userLogin=(createAsyncThunk("auth/userLogin",async(data:LoginFormData,{rejectWithValue})=>{
    try {
        const response=await apiserviceMethood.userLogin("/userLogin",data)
        if (response.data && response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          return response.data;
    } catch (error:any) {
       
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error)
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
        
    }

}))
export const kycSubmits=(createAsyncThunk("auth/kycSubmit",async(data:kycSubmit,{rejectWithValue})=>{
    try {
      
        const response=await apiserviceMethood.kycSubmit("/kycSubmit",data)
         return response.data;
    } catch (error:any) {
      
        if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unexpected error occurred");
        
    }

}))