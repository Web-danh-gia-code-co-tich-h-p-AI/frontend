import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BlockInfoAccount = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        const token = Cookies.get('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5136/api/Account/Account', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });

            if (!response.ok) {
            throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            setError(error.message);
        }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove('token'); // Xóa cookie chứa token
        navigate('/login'); // Điều hướng người dùng đến trang đăng nhập
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-12 mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Name</p>
                <p className="text-gray-900">{userData.name}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Username</p>
                <p className="text-gray-900">{userData.userName}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{userData.email}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Phone Number</p>
                <p className="text-gray-900">{userData.phoneNumber}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Email Confirmed</p>
                <p className="text-gray-900">{userData.emailConfirmed ? 'Yes' : 'No'}</p>
                </div>
            </div>
            </div>
            <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
            Logout
            </button>
        </div>
        </div>
    );
};

export default BlockInfoAccount;
