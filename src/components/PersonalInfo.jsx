"use client";

import React, { useState } from 'react';


const PersonalInfo = ({ page, setPage, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);


  const handlesubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      setPage(page + 1);
    }
  }

  const validateForm = (inputValues) => {
    let errors = {};
    if (!inputValues.nickname) {
      errors.nickname = 'NickName is required';
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
      <div className="step-title">Personal Info #3</div>
      <input
        className='my-1'
        type="text"
        placeholder="Nickname"
        value={formData.nickname}
        name='nickname'
        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
      />
      {submit && errors.nickname && <div className="text-red-600 text-start">{errors.nickname}</div>}
      <input
        className='my-1'
        type="text"
        placeholder="Email"
        value={formData.email}
        name='email'
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {submit && errors.email && <div className="text-red-600 text-start">{errors.email}</div>}

      <button type='submit' className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"' onClick={handlesubmit}>
        Next
      </button>
      <button className='rounded-md shadow-2xl shadow-red-600 bg-red-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600' onClick={() => {
        setPage(page - 1);
      }}>
        Previous
      </button>
    </div>
  )
}

export default PersonalInfo