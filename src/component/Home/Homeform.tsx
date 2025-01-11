import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { useAppDispatch } from "../../store/Configure";
import { useNavigate } from "react-router-dom";
import { reset } from "../../reducers/slice/authSlice";
import { kycSubmits } from "../../actions/userAction";
import { useSelector } from "react-redux";
import { userState } from "../../Interfaces/slice";
import apiserviceMethood from "../../service.ts/UserService";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isKycSubmit } = useSelector((state: { user: userState }) => ({
    isKycSubmit: state.user.user?.isKycSubmit,
  }));
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    aadhaarName: "",
    aadhaar: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  const validateInput = (name: string, value: string | File | null): string => {
    switch (name) {
      case "fullName":
        if (!value || typeof value !== "string" || value.trim().length < 6) {
          return "Full name must be at least 6 characters.";
        }
        break;
      case "idNumber":
        if (!value || typeof value !== "string" || value.length !== 16) {
          return "ID Number must be exactly 16 digits.";
        }
        if (!/^\d{16}$/.test(value)) {
          return "ID Number must contain only numbers.";
        }
        break;
      case "aadhaarName":
        if (!value || typeof value !== "string" || value.trim().length < 6) {
          return "Aadhaar name must be at least 6 characters.";
        }
        break;
      case "aadhaar":
        if (value instanceof File) {
          const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
          const maxSize = 2 * 1024 * 1024; 
          if (!validExtensions.includes(value.type)) {
            return "Invalid file type. Only JPG and PNG images are allowed.";
          }
          if (value.size > maxSize) {
            return "File size exceeds 2MB.";
          }
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const errorMessage = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMessage = validateInput("aadhaar", file);
      setErrors((prevErrors) => ({
        ...prevErrors,
        aadhaar: errorMessage,
      }));
      if (!errorMessage) {
        setFormData((prev) => ({
          ...prev,
          aadhaar: file,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((field) => {
      const errorMessage = validateInput(field, formData[field as keyof typeof formData]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(kycSubmits(formData));
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleLogout = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      dispatch(reset());
      apiserviceMethood.logout("/logout");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">Welcome to the KYC Submission Portal</h2>
        {isKycSubmit === "NotSubmitted" && !showForm && (
          <div className="mb-4">
            <Button
              type="button"
              label="Add KYC"
              onClick={() => setShowForm(true)}
            />
          </div>
        )}

        {isKycSubmit === "Pending" && (
          <div className="text-center text-yellow-500 font-medium">
            Your KYC is pending for review.
          </div>
        )}
        {isKycSubmit === "Approved" && (
          <div className="text-center text-green-500 font-medium">
            Your KYC is Approved
          </div>
        )}

        {isKycSubmit === "Rejected" && (
          <div className="text-center text-red-500 font-medium">
            Your KYC was rejected. Please try again.
          </div>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <InputField
              id="Name"
              label="Name"
              name="fullName"
              type="text"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              hasError={!!errors.fullName}
              errorMessage={errors.fullName}
            />
            <div className="mt-4">
              <InputField
                id="idNumber"
                label="Adhar card Number"
                name="idNumber"
                type="number"
                placeholder="Enter your Voter ID number"
                value={formData.idNumber}
                onChange={handleChange}
                hasError={!!errors.idNumber}
                errorMessage={errors.idNumber}
              />
            </div>
            <div className="mt-4">
              <InputField
                id="aadhaarName"
                label="Aadhaar Card Holder's Full Name"
                name="aadhaarName"
                type="text"
                placeholder="Enter full name as per Aadhaar"
                value={formData.aadhaarName}
                onChange={handleChange}
                hasError={!!errors.aadhaarName}
                errorMessage={errors.aadhaarName}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">
                Upload Aadhaar  (JPG/PNG only)
              </label>
              <input
                id="aadhaar"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className={`mt-1 block w-full text-sm ${
                  errors.aadhaar ? "text-red-500" : "text-gray-500"
                }`}
              />
              {errors.aadhaar && <p className="mt-2 text-sm text-red-600">{errors.aadhaar}</p>}
            </div>
            <div className="mt-6">
              <Button type="submit" label="Submit KYC" />
            </div>
          </form>
        )}

        <div className="mt-4">
          <Button
            type="button"
            label={showForm ? "Back" : "Logout"}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
