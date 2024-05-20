import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'student', // Default to student
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const { name, email, password, confirmPassword, accountType } = formData;
        const token = Cookies.get('token');

        if (!token) {
        setError('No token found. Please log in.');
        return;
        }

        let apiUrl = '';
        if (accountType === 'student') {
        apiUrl = 'http://yunom2834-001-site1.gtempurl.com/api/Account/CreateStudent';
        } else if (accountType === 'teacher') {
        apiUrl = 'http://yunom2834-001-site1.gtempurl.com/api/Account/CreateTeacher';
        } else {
        apiUrl = 'http://yunom2834-001-site1.gtempurl.com/api/Account/register';
        }

        try {
        const response = await axios.post(apiUrl, {
            name,
            email,
            password,
            confirmPassword,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        setSuccess('User account created successfully!');
        setTimeout(() => {
            setSuccess("");
        }, 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create user account');
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto">
        <div className="max-w-md p-4 mx-auto bg-white border border-gray-300 rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Create User Account</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {success && <div className="mb-4 text-green-500">{success}</div>}
            <form onSubmit={handleFormSubmit}>
                <div className="flex mb-4">
                    <div className='mr-4'>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Name</label>
                            <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder='Enter your name...'
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Email</label>
                            <input
                            type="email"
                            name="email"
                            placeholder='Enter your email...'
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            required
                            />
                        </div>
                        
                    </div>
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Password</label>
                            <input
                            type="password"
                            name="password"
                            placeholder='Enter your password...'
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Confirm Password</label>
                            <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm your password...'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Account Type</label>
                            <select
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            required
                            >
                            <option value="student">Học sinh</option>
                            <option value="teacher">Giáo viên</option>
                            <option value="guest">Khách</option>
                            </select>
                        </div>
                    </div>
                </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Create Account
            </button>
            </form>
        </div>
        </div>
    );
};

export default CreateUser;
