import { useState, useEffect } from "react";
import axios from "axios";
import FallbackComponent from "../../utils/FallbackComponent";
import { withErrorBoundary } from "react-error-boundary";
import AdminCreateAccount from "./AdminCreateAccount";

const AdminAccountDisplay = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("User");
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
        `https://yunom2834-001-site1.gtempurl.com/api/Account/GetUserByRole${role}`
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
    <div className="container mx-auto mb-4 laptop:h-[500px]">
      <h1 className="flex justify-end p-4 font-bold h-fit tablet:text-3xl bg-zinc-300">
        Quản lý thông tin tài khoản
      </h1>
      <div className="justify-center p-4 laptop:flex laptop:relative">
        <div className="p-6 mr-4 bg-white border border-gray-300 rounded-md shadow-md h-fit">
          <div className="items-center justify-center mb-4 tablet:flex">
            <span className="mt-3 mr-2">Select Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-2 py-1 mt-3 border rounded"
            >
              <option value="User">User</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-2 py-1 mt-3 ml-4 border rounded"
            />
          </div>
          <div className="ml-5 laptop:h-[285px]">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="items-center w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border bg-zinc-300">Name</th>
                      <th className="px-4 py-2 border bg-zinc-300">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{user.name}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            <div className="mt-4 ml-4">
              <ul className="flex">
                {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
                  (number) => (
                    <li key={number} className="mx-1">
                      <button
                        onClick={() => paginate(number + 1)}
                        className="px-3 py-1 border rounded bg-zinc-300 hover:bg-zinc-400"
                      >
                        {number + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-3 laptop:mt-0 h-fit">
          <AdminCreateAccount />
        </div>
      </div>
    </div>
  );
};

const EnhancedAdminAccountDisplay = withErrorBoundary(AdminAccountDisplay, {
  FallbackComponent,
});

export default EnhancedAdminAccountDisplay;
