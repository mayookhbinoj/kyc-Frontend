
export interface LoginFormData{
    email:string;
    password:string;
    role:?string;
    isKycSubmit?:string;
}
export interface kycSubmit{
    fullName: string,
    idNumber: string,
    aadhaarName: string,
    aadhaar: null | File
}
export interface KycDetails {
    _id: string; 
    fullName: string;
    idNumber: string;
    aadhaarName?: string; 
    aadhaarImageId?: string; 
    userId: string; 
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface getUserData {
    _id: string; 
    email: string;
    password: string; 
    role: string;
    isKycSubmit: string;
    createdAt: string;
    __v: number;
    kycDetails: KycDetails | null; 
  }
  