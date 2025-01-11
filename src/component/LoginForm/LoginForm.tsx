import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import Checkbox from '../Checkbox/Checkbox';
import { useAppDispatch } from "../../store/Configure";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../actions/userAction";
import { userState } from "../../Interfaces/slice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUsers } from "../../actions/adminAction";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSucess, role } = useSelector((state: { user: userState }) => ({
    isSucess: state.user.isSucess,
    role: state.user.user?.role,
  }));

  const [formDataState, setFormData] = useState({ email: "", password: "", role: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateInput = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format.";
        break;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
        if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter.";
        if (!/[0-9]/.test(value)) return "Password must include at least one number.";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must include at least one special character.";
        
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const errorMessage = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.keys(formDataState).forEach((key) => {
      const errorMessage = validateInput(key, formDataState[key as keyof typeof formDataState]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(userLogin(formDataState));
      } catch (err) {
        console.error("Login failed:", err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (isSucess && role === "User") {
      toast.success("User Home - Welcome to the KYC Portal.");
      navigate("/Home");
    }
    if (isSucess && role === "admin") {
      dispatch(getUsers());
      navigate("/adminHome");
    }
  }, [isSucess, role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-indigo-900">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formDataState.email}
            onChange={handleChange}
            hasError={!!errors.email}
            errorMessage={errors.email}
          />
          <div className="mt-4">
            <InputField
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formDataState.password}
              onChange={handleChange}
              hasError={!!errors.password}
              errorMessage={errors.password}
            />
            
          </div>
          <div className="flex items-center justify-between mt-2">
            <Checkbox label="Remember me" />
          </div>
          <div className="mt-6">
            <Button type="submit" label="Login" />
          </div>
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
