import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useAppDispatch } from "../../store/Configure";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/userAction";
import { useSelector } from "react-redux";
import { userState } from "../../Interfaces/slice";
import toast from "react-hot-toast";
import { reset } from "../../reducers/slice/authSlice";

const RegisterForm: React.FC = () => {
  const [formDataState, setFormDataState] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message, isSucess } = useSelector((state: { user: userState }) => ({
    message: state.user.message,
    isSucess: state.user.isSucess,
  }));

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
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Password must include at least one special character.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataState((prevState) => ({
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
        dispatch(registerUser(formDataState));
      } catch (err) {
        console.error("Registration failed:", err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    if (isSucess) {
      toast.success("Please Sign In");
      navigate("/");
      dispatch(reset());
    }
  }, [message, isSucess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-900">Create Your Account</h1>
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
          <Button type="submit" label="Register" />
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
