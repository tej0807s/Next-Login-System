"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = ({ page, setPage, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const navigate = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      setPage(page + 1); // Only proceed to the next page if there are no errors
    }
  }

  const validateForm = (inputValues) => {
    let errors = {};
    if (!inputValues.fullname) {
      errors.fullname = 'FullName is required';
    }
    if (!inputValues.username) {
      errors.username = 'UserName is required';
    }
    if (!inputValues.password) {
      errors.password = 'Password is required';
    } else if (inputValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  }

  return (
    <div className="card">
      <div className="step-title">Sign Up #1</div>
      <input
        type="text"
        placeholder="Full Name"
        className="form-group"
        name='fullname'
        value={formData.fullname}
        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
      />
      {submit && errors.fullname && <div className='text-red-600 text-start'>{errors.fullname}</div>}
      <input
        type="text"
        className="form-group"
        placeholder="Username"
        name='username'
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      {submit && errors.username && <div className='text-red-600 text-start'>{errors.username}</div>}
      <input
        type="password"
        className="form-group"
        placeholder="Password"
        name='password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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