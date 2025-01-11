import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../../Interfaces/slice";
import { LoginFormData } from "../../Interfaces/forms";
import { kycSubmits, registerUser, userLogin } from "../../actions/userAction";
import { getUsers, kycReject, kycsucess } from "../../actions/adminAction";


let parsedUser: LoginFormData | null = null;

const userFromStorage: string | null = localStorage.getItem("user");

if (userFromStorage) {
    try {
        parsedUser = JSON.parse(userFromStorage) as LoginFormData;
    } catch (error: any) {
        console.error("Failed to parse user from storage:", error);
        parsedUser = null;
    }
}

const initialState: userState = {
    user: parsedUser,
    users:[],
    isError: false,
    isLoading: false,
    isSucess: false,
    isChange: false,
    isEmail: false,
    message: "",
};

const userSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSucess = false;
            state.isEmail = false;
            state.message = "";
            state.user = null; 
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.message=""

        })
        .addCase(registerUser.rejected,(state,action: PayloadAction<any>)=>{
              state.isSucess=false
              state.isError=true
              state.message=action.payload
        })
        .addCase(userLogin.pending,(state)=>{
            state.isLoading=true
            state.message=""
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.user= state.user={...action.payload.user}
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.isError=true
            state.isSucess=false
        })
        .addCase(kycSubmits.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(kycSubmits.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.user= state.user={...action.payload.user}
        })
        .addCase(kycSubmits.rejected,(state,action)=>{
            state.isError=true
            state.isSucess=false
        })
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users=action.payload.data
        })
        .addCase(getUsers.rejected, (state) => { 
            state.isError = true;
        })
        .addCase(kycsucess.pending, (state) => { 
            state.isLoading = true;
        })
        .addCase(kycsucess.fulfilled, (state,action) => { 
            state.isLoading = false;
            state.users=action.payload.data
        })
        .addCase(kycsucess.rejected, (state,action) => { 
            state.isError = true;
    
        })
        .addCase(kycReject.pending, (state) => { 
            state.isLoading = true;
    
        })
        .addCase(kycReject.fulfilled, (state,action) => { 
            state.isLoading = false;
            state.users=action.payload.data
    
        })
        .addCase(kycReject.rejected, (state) => { 
           state.isError=true
        })
        
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
