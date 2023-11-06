"use client";


import React, { useState } from 'react';
// import './style.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';


const OtherInfo = ({ page, setPage, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setSubmit(true);

    if (formData) {
      try {
        formData.gender = selectedGender;
        const response = await axios.post('/api/uses/register', formData);
        alert("User Saved Successfully!!", response.data);
        route.push('/login');
      } catch (error) {
        alert("Error Saving User", error);
      }

    }

  }

  const validateForm = (inputValues) => {
    let errors = {};
    if (!inputValues.occupation) {
      errors.occupation = 'Occupation is required';
    }
    if (!inputValues.about) {
      errors.about = 'About is required';
    }
    if (!selectedGender) {
      errors.gender = 'Gender is required';
    }
    return errors;
  }


  return (
    <div className="card">
      <div className="step-title">Other Info #4</div>

      <input
        className='my-1'
        type="text"
        placeholder="Occupation"
        value={formData.occupation}
        name='occupation'
        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
      />
      {submit && errors.occupation && <div className="text-red-600 text-start">{errors.occupation}</div>}

      <div className="gender-radio-group my-1">
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={selectedGender === "Male"}
          onChange={() => setSelectedGender("Male")}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={selectedGender === "Female"}
          onChange={() => setSelectedGender("Female")}
        />
        <label htmlFor="female">Female</label>
      </div>

      <textarea
        className='my-1'
        type="text"
        placeholder="About"
        value={formData.about}
        name='about'
        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
      />
      {submit && errors.about && <div className="text-red-600 text-start">{errors.about}</div>}
      <button type='submit' className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={handleSubmit}>
        Submit
      </button>
      <button className='rounded-md shadow-2xl shadow-red-600 bg-red-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600' onClick={() => {
        setPage(page - 1);
      }}>
        Previous
      </button>
    </div>
  )
}

export default OtherInfo