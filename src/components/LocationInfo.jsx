"use client";

import React, { useState } from 'react';


const LocationInfo = ({ page, setPage, formData, setFormData }) => {
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);


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
                value={formData.address}
                name='address'
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {submit && errors.address && <div className="text-red-600 text-start">{errors.address}</div>}
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
            {submit && errors.nationality && <div className="text-red-600 text-start">{errors.nationality}</div>}

            <input
                className='my-1'
                type="text"
                placeholder="Zipcode"
                value={formData.zipcode}
                name='zipcode'
                onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
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