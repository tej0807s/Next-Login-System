"use client";

import React from 'react'
//import './style.css';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Loginform = () => {

    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });

    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(loginFormData);
        setErrors(formErrors);
        setSubmit(true);

        if (Object.keys(formErrors).length === 0) {
            try {
                const res = await axios.post('/api/uses/login', loginFormData);
                if (res.status === 200) {

                    const isAdmin = res.data.admin;
                    
                    if (isAdmin === true) {
                        alert('Admin Login successful');
                        router.push("/admin");
                    } else {
                        alert('User Login successful');
                        router.push("/user");
                    }
                }
            } catch (error) {
                console.error('Error logging in', error);
                alert('Login failed. Check your email and password.')
            }
        }

    }

    const validateForm = (inputValues) => {
        let errors = {};
        if (!inputValues.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(inputValues.email)) {
            errors.email = 'Invalid email format.';
        }
        if (!inputValues.password) {
            errors.password = 'Password is required';
        } else if (inputValues.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }
        return errors;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }


    const handleChange = ({ currentTarget: input }) => {
        setLoginFormData({ ...loginFormData, [input.name]: input.value });
    }



    return (
        <div className="cons">
            <div className="card mt-6">
                <div className="step-title">Login Form</div>
                <input
                    className='my-1'
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleChange}
                />
                {submit && errors.email && <div className="text-red-600">{errors.email}</div>}
                <input
                    className='my-1'
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                />
                {submit && errors.password && <div className="text-red-600">{errors.password}</div>}
                <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"' type='submit' onClick={handleSubmit}>
                    Login
                </button>
                <Link className=" text-center mt-2 rounded-md shadow-2xl shadow-red-600 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" href={"/"}>Rgister</Link>
                
            </div>
        </div>
    )
}

export default Loginform