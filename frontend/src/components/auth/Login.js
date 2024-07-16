import React, { useState } from "react";
import TextField from "../form/TextField";
import Button from "../form/Button";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

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
 
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "username is required";
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
      dispatch(login(formData));
      navigate('/')
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="login-page-wrapper h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-start login-page">
        <h1 className="text-3xl font-bold text-gray-600 mb-10">Welcome Back !</h1>
        <div className="login-form border p-10 rounded-md flex flex-col gap-3 items-center shadow shadow-lg bg-white mb-20">
          <h1 className="text-2xl font-semibold text-gray-700">Login</h1>
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            width="400"
            error={errors.password}
            required={true}
          />
          <p> New user ? <Link to='/register' className='text-blue-500'>Register</Link> </p>
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