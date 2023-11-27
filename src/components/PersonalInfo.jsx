"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PersonalInfo = ({ page, setPage, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});

  const newId = formData.personalId;

  useEffect(() => {
    if (newId) {
      getUserDetails(newId);
    }
  }, [newId]);


  const getUserDetails = async (newId) => {
    try {
      const response = await axios.get(`/api/uses/personalinfo/${newId}`);
      const user = response.data.data;
      setPersonalInfo(user);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(personalInfo);
    setErrors(formErrors);
    setSubmit(true);

    if (Object.keys(formErrors).length === 0 && personalInfo) {
      try {
        if (newId) {
          const res = await axios.put(`/api/uses/personalinfo/${newId}`, personalInfo);
          if (res.status === 200) {
            alert('User Saved successfully');
            setFormData({
              ...formData, nickname: personalInfo.nickname,
              username: personalInfo.username,
            });
            setPage(page + 1);
          } else {
            console.error('Failed to update user');
          }
        } else {
          const response = await axios.post('/api/uses/personalinfo', personalInfo);
          alert("User Saved Successfully!!", response.data);
          const userId = response.data.data;
          setFormData({
            ...formData, nickname: personalInfo.nickname,
            username: personalInfo.username,
            personalId: userId,
          });
          setPage(page + 1)
        }
      } catch (error) {
        alert("Error Saving User", error);
        console.log(error);
      }
    }
  }

  const validateForm = (inputValues) => {
    let errors = {};
    if (!inputValues.nickname) {
      errors.nickname = 'NickName is required';
    }
    if (!inputValues.username) {
      errors.username = 'UserName is required';
    }
    return errors;

  }


  return (
    <div className="card">
      <div className="step-title">Personal Info #3</div>
      <input
        className='my-1'
        type="text"
        placeholder="Nickname"
        value={personalInfo.nickname}
        name='nickname'
        onChange={(e) => setPersonalInfo({ ...personalInfo, nickname: e.target.value })}
      />
      {submit && errors.nickname && <div className="text-red-600 text-start">{errors.nickname}</div>}
      <input
        type="text"
        className="form-group"
        placeholder="Username"
        name='username'
        value={personalInfo.username}
        onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
      />
      {submit && errors.username && <div className='text-red-600 text-start'>{errors.username}</div>}
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