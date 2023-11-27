"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const SignUp = ({ page, setPage, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [signupData, setSignupData] = useState({});

  const newId = formData.signupId;

  useEffect(() => {
    if (newId) {
      getUserDetails(newId);
    }
  }, [newId]);


  const getUserDetails = async (newId) => {
    try {
      const response = await axios.get(`/api/uses/signup/${newId}`);
      const user = response.data.data;
      setSignupData(user);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handlesubmit = async () => {

    // if (!formData) {
    const formErrors = validateForm(signupData);
    setErrors(formErrors);
    setSubmit(true);

    if (Object.keys(formErrors).length === 0 && signupData) {
      try {

        if (newId) {
          const res = await axios.put(`/api/uses/signup/${newId}`, signupData);
          if (res.status === 200) {
            alert('User Saved successfully');
            setFormData({
              ...formData, fullname: signupData.fullname,
              email: signupData.email,
              password: signupData.password,
            });
            setPage(page + 1);
          } else {
            console.error('Failed to update user');
          }
        } else {
          const response = await axios.post('/api/uses/signup', signupData);
          alert("User Saved Successfully!!", response.data);
          const userId = response.data.data;
          setFormData({
            ...formData, fullname: signupData.fullname,
            email: signupData.email,
            password: signupData.password,
            signupId: userId,
          });
          setPage(page + 1);
        }

      } catch (error) {
        alert("Error Saving User", error);
        console.log(error);
      }
    }


  }

  const validateForm = (inputValues) => {
    let errors = {};
    if (!inputValues.fullname) {
      errors.fullname = 'FullName is required';
    }
    if (!inputValues.password) {
      errors.password = 'Password is required';
    } else if (inputValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!inputValues.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(inputValues.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }


  return (
    <div className="card">
      <div className="step-title">Sign Up #1</div>
      <input
        type="text"
        placeholder="Full Name"
        className="form-group"
        name='fullname'
        value={signupData.fullname}
        onChange={(e) => setSignupData({ ...signupData, fullname: e.target.value })}
      />
      {submit && errors.fullname && <div className='text-red-600 text-start'>{errors.fullname}</div>}
      <input
        className='form-group'
        type="text"
        placeholder="Email"
        value={signupData.email}
        name='email'
        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
      />
      {submit && errors.email && <div className="text-red-600 text-start">{errors.email}</div>}
      <input
        type="password"
        className="form-group"
        placeholder="Password"
        name='password'
        value={signupData.password}
        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
      />
      {submit && errors.password && <div className="text-red-600 text-start">{errors.password}</div>}
      <button type="submit" className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"' onClick={handlesubmit}>
        Next
      </button>
      <Link className=" text-center mt-2 rounded-md shadow-2xl shadow-red-600 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        href={"/login"}>Login</Link>
    </div>
  )
}

export default SignUp