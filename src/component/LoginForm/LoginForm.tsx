import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { LoginFormData } from "../../Interfaces/forms"; 
import InputField from "../InputField/InputField";
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import { formData } from '../../utils/validationSchema';
import { useAppDispatch } from '../../store/Configure';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../actions/userAction';
import { userState } from '../../Interfaces/slice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getUsers } from '../../actions/adminAction';


const LoginForm: React.FC = () => {
   const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const {  isSucess, role, } = useSelector((state: { user: userState }) => ({
      message: state.user.message,
      isSucess: state.user.isSucess,
      role: state.user.user?.role, 
      
    }));

    
    
  const [formDataState, setFormData] = useState<LoginFormData>({ email: "", password: "",role:'' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateInput = (name: string, value: string) => {
    try {
      formData.pick({ [name]: true }).parse({ [name]: value });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0].message;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMessage,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateInput(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     let response=await formData.parse(formDataState);
     if(response){
      dispatch(userLogin(formDataState))
     }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { email?: string; password?: string } = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  }

  useEffect(()=>{
    if(isSucess && role=="User"){
      toast.success("User Home - Welcome to the KYC Portal.")
      navigate("/Home")
    }
    if(isSucess && role=="admin"){
     dispatch(getUsers())
      navigate("/adminHome")
    }

  },[isSucess,role])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-indigo-900">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email Address"
            name="email"
            value={formDataState.email}
            type="email"
            onChange={handleChange}
            placeholder="Enter your email"
            hasError={!!errors.email}
            errorMessage={errors.email}
          />
          <InputField
            id="password"
            label="Password"
            name="password"
            value={formDataState.password}
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            hasError={!!errors.password}
            errorMessage={errors.password}
          />
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />
          </div>
          <Button type="submit" label="Log In" />
        </form>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
