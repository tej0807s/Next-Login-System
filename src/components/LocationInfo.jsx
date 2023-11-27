"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'


const LocationInfo = ({ page, setPage, formData, setFormData }) => {
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);
    const [locationInfo, setLocationInfo] = useState({});

    const newId = formData.locationId;

    useEffect(() => {
        if (newId) {
            getUserDetails(newId);
        }
    }, [newId]);


    const getUserDetails = async (newId) => {
        try {
            const response = await axios.get(`/api/uses/locationinfo/${newId}`);
            const user = response.data.data;
            setLocationInfo(user);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handlesubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(locationInfo);
        setErrors(formErrors);
        setSubmit(true);

        if (Object.keys(formErrors).length === 0 && locationInfo) {
            try {
                if (newId) {
                    const res = await axios.put(`/api/uses/locationinfo/${newId}`, locationInfo);
                    if (res.status === 200) {
                        alert('User Saved successfully');
                        setFormData({
                            ...formData, address: locationInfo.address,
                            nationality: locationInfo.nationality,
                            zipcode: locationInfo.zipcode,
                        });
                        setPage(page + 1);
                    } else {
                        console.error('Failed to update user');
                    }
                } else {
                    const response = await axios.post('/api/uses/locationinfo', locationInfo);
                    alert("User Saved Successfully!!", response.data);
                    const userId = response.data.data;
                    setFormData({
                        ...formData, address: locationInfo.address,
                        nationality: locationInfo.nationality,
                        zipcode: locationInfo.zipcode,
                        locationId: userId,
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
        if (!inputValues.address) {
            errors.address = 'Address is required';
        }
        if (!inputValues.nationality) {
            errors.nationality = 'Nationality is required';
        }
        if (!inputValues.zipcode) {
            errors.zipcode = 'Zipcode is required';
        } else if (!isValidZip(inputValues.zipcode)) {
            errors.zipcode = 'zipcode must be at least 6 characters and number only!.';
        }
        return errors;
    }


    const isValidZip = (zipcode) => {
        const indianPINCodePattern = /^\d{6}$/;
        return indianPINCodePattern.test(zipcode);
    }

    return (
        <div className="card">
            <div className="step-title">Location Info #2</div>
            <input
                className='my-1'
                type="text"
                placeholder="Address"
                value={locationInfo.address}
                name='address'
                onChange={(e) => setLocationInfo({ ...locationInfo, address: e.target.value })}
            />
            {submit && errors.address && <div className="text-red-600 text-start">{errors.address}</div>}
            <select
                className='my-1'
                value={locationInfo.nationality}
                name='nationality'
                onChange={(e) => setLocationInfo({ ...locationInfo, nationality: e.target.value })}
            >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="British">British</option>
            </select>
            {submit && errors.nationality && <div className="text-red-600 text-start">{errors.nationality}</div>}

            <input
                className='my-1'
                type="text"
                placeholder="Zipcode"
                value={locationInfo.zipcode}
                name='zipcode'
                onChange={(e) => setLocationInfo({ ...locationInfo, zipcode: e.target.value })}
            />
            {submit && errors.zipcode && <div className="text-red-600 text-start">{errors.zipcode}</div>}

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

export default LocationInfo