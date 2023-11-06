"use client";

import React from 'react';
import { useState } from "react";
import LocationInfo from './LocationInfo';
import OtherInfo from './OtherInfo';
import PersonalInfo from './PersonalInfo';
import Signup from './SignUp';

const Home = () => {

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    nickname: "",
    email: "",
    address: "",
    nationality: "",
    zipcode: "",
    occupation: "",
    about: "",
    gender: "",
    isAdmin: false // Set the default value for isAdmin
  })

  const componentList = [
    <Signup
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <LocationInfo
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <PersonalInfo
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <OtherInfo
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
  ];

  return (
    <>
      <div className="App">
        <div className="progress_new">
          <div className="progress progress-striped">
            <div className="progress-bar" style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : page === 3 ? "100%" : "100" }}>
            </div>
          </div>
        </div>

        <div>{componentList[page]}</div>
      </div>
    </>
  )
}

export default Home