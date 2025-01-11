import { createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../service.ts/AdminService";
import toast from "react-hot-toast";

export const getUsers=(createAsyncThunk("auth/getUser",async()=>{
    try {
        const response=await adminService.getUser("/getUser")
          return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error)
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
            
          }
        
    }

}))
export const kycsucess=(createAsyncThunk("auth/kycsucess",async(id:string)=>{
    try {
        const response=await adminService.approveKyc("/kycApprove",{id})
          return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error)
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
            
          }
        
    }

}))
export const kycReject=(createAsyncThunk("auth/kycReject",async(id:string,)=>{
    try {
        const response=await adminService.rejectKyc("/kycReject",{id})
          return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error)
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }         
          }
        
    }

}))