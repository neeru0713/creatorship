
import React, { useState } from "react";
import TextField from "../form/TextField";
import Button from "../form/Button";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../redux/actions/authActions";
export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) newErrors.password = "password is required";
    else if (!validatePassword(formData.password)) {
      newErrors.password =
        "password must contain an uppercase, lowercase, number, special character with length of atleast 8 characters";
    }

    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      dispatch(register(formData));
      navigate('/')
    } else {
      setErrors(formErrors);
    }
    
  };

  return (
    <div className="register-page-wrapper h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-start register-page">
        <h1 className="text-3xl font-bold text-gray-600 mb-10">New User ?</h1>
        <div className="register-form border p-10 rounded-md flex flex-col gap-3 items-center shadow shadow-lg bg-white">
          <h1 className="text-xl font-semibold">Register</h1>
          <TextField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            width="400"
            error={errors.username}
            required={true}
          />
          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            width="400"
            error={errors.email}
            required={true}
          />
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            width="400"
            error={errors.password}
            required={true}
          />

         
           <p> Already a user ? <Link to='/login' className='text-blue-500'>Login</Link> </p>
          <div className="form-btn mt-5">
            <Button
              width="400"
              name="Submit"
              type="primary"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
