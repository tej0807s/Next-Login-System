"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({params}) => {
   
    const router = useRouter();
    const { id } = params;
   
    const [selectedGender, setSelectedGender] = useState("");
    const [formData, setFormData] = useState("");


    useEffect(() => {
        if (id) {
            getUserDetails();
        }
    }, [id]);

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/delete/${id}`);
            const user = response.data.data;
            setFormData(user);
            setSelectedGender(user.gender);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async () => {
        formData.gender = selectedGender;
        try {
            const res = await axios.put(`/api/delete/${id}`, formData);
            if (res.status === 200) {
                alert('User updated successfully');
                router.push('/admin'); // Redirect to the admin page after successful update
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = async () => {
        router.push('/admin');
    }

    return (
        <div className="consupdate">
            <div className="card">
                <div className="step-title">Update Details</div>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="form-group"
                    name='fullname'
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
                <input
                    type="text"
                    className="form-group"
                    placeholder="Username"
                    name='username'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    className='my-1'
                    type="text"
                    placeholder="Nickname"
                    value={formData.nickname}
                    name='nickname'
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                />
                <input
                    className='my-1'
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    name='email'
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-group"
                    placeholder="Password"
                    name='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                    className='my-1'
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    name='address'
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <select
                    className='my-1'
                    value={formData.nationality}
                    name='nationality'
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                >
                    <option value="">Select Nationality</option>
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                    <option value="British">British</option>
                </select>
                <input
                    className='my-1'
                    type="text"
                    placeholder="Zipcode"
                    value={formData.zipcode}
                    name='zipcode'
                    onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                />
                <input
                    className='my-1'
                    type="text"
                    placeholder="Occupation"
                    value={formData.occupation}
                    name='occupation'
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />
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
                <input
                    className='my-1'
                    type="text"
                    placeholder="isAdmin"
                    value={formData.isAdmin}
                    name='isAdmin'
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.value })}
                />

                <textarea
                    className='my-1'
                    type="text"
                    placeholder="About"
                    value={formData.about}
                    name='about'
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                />
                <div className="inline-flex rounded-md shadow-sm space-x-4">
                    <button
                        type="submit"
                        className="mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button
                        type="submit"
                        onClick={handleCancel}
                        className="mt-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;