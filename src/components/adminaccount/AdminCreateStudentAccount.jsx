import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AdminCreateStudentAccount = () => {
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get("token");
            if (!token) {
            setError("No token found. Please log in.");
            return;
            }
    
            try {
            const response = await fetch(
                "https://yunom2834-001-site1.gtempurl.com/api/Account/Account",
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
    
            const data = await response.json();
            setFormData(data);
            } catch (error) {
            setError(error.message);
            }
        };
    
        fetchUserData();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'student', // default value
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const url =
        formData.accountType === 'student'
            ? 'http://yunom2834-001-site1.gtempurl.com/api/Account/CreateStudent'
            : 'http://yunom2834-001-site1.gtempurl.com/api/Account/CreateTeacher';

        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create account');
        }

        const data = await response.json();
        setSuccess('Account created successfully!');
        setError(null);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: 'student',
        });
        } catch (error) {
        setError(error.message);
        setSuccess(null);
        }
    };

    return (
        <div className="max-w-md p-6 mx-auto bg-white border border-gray-300 rounded-md shadow-md h-fit">
        <h1 className="mb-4 text-2xl font-bold">Create Account</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <form onSubmit={handleFormSubmit}>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                        required
                    />
                    </div>
                </div>
                <div className="w-1/2 pl-2">
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Account Type
                    </label>
                    <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                    >
                        <option value="student">Học sinh</option>
                        <option value="teacher">Giáo viên</option>
                    </select>
                    </div>
                </div>
            </div>
            
            <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
            Create Account
            </button>
        </form>
        </div>
    );
};

export default AdminCreateStudentAccount;
