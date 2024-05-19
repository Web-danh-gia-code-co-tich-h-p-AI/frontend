import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAccountDisplay = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("Student");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, [role, currentPage, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        try {
        const response = await axios.get(
            `http://localhost:5136/api/Account/GetUserByRole${role}`
        );
        setUsers(response.data);
        } catch (error) {
        console.error("Error fetching data: ", error);
        } finally {
        setLoading(false);
        }
    };

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users
        .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto mb-4 h-full laptop:relative laptop:h-[500px]">
            <h1 className="flex justify-between p-4 font-bold tablet:text-3xl bg-zinc-300">Manager Account</h1>
            <div className="flex items-center mb-4 ml-5">
                <span className="mr-2 mt-3">Select Role:</span>
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-2 py-1 border rounded mt-3"
                >
                    <option value="User">User</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                </select>
                <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                className="px-2 py-1 ml-4 border rounded mt-3"
                />
            </div>
            <div className="ml-5 laptop:h-[250px]">
                {loading ? (
                <p>Loading...</p>
                ) : (
                <>
                    <table className="w-1/3 border-collapse">
                    <thead>
                        <tr>
                        <th className="border px-4 py-2 bg-zinc-300">Name</th>
                        <th className="border px-4 py-2 bg-zinc-300">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </>
                )}
            </div>
            <div className="ml-4 mt-4 laptop:absolute">
                <ul className="flex laptop:absolute">
                    {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
                    <li key={number} className="mx-1">
                        <button onClick={() => paginate(number + 1)} className="px-3 py-1 border rounded bg-zinc-300 hover:bg-zinc-400">
                        {number + 1}
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminAccountDisplay;
