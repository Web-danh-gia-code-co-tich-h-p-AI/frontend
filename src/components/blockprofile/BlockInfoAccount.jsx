import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";
import axiosInstance from "../../api/axiosConfig";

const BlockInfoAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axiosInstance.get("/Account/Account");

        const data = response.data;
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          password: "",
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn muốn Thoát tài khoản?");
    if (!isConfirmed) {
      return;
    }
    Cookies.remove("token");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/Account/UpdateAccount/${userData.id}`,
        {
          body: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const data = response.data;
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-center mt-12">
        <div className="p-4 mb-3 bg-gray-100 rounded-lg shadow-md w-fit">
          <p className="text-xl font-bold text-gray-700">Your Roles</p>
          <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-4">
            {userData.userRoles.map((role, index) => (
              <p
                key={index}
                className="p-4 font-extrabold text-center text-gray-900 rounded-md shadow-md hover:-translate-y-1 bg-slate-200"
              >
                {role}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isEditing ? (
          <form onSubmit={handleUpdateAccount}>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-4">
              <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Email</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Password</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Phone Number</p>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 mt-4 ml-4 text-white transition duration-300 bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            {userData && (
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="font-medium text-gray-700">Name</p>
                  <p className="text-gray-900 ">{userData.name}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="font-medium text-gray-700">Username</p>
                  <p className="text-gray-900">{userData.userName}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="font-medium text-gray-700 ">Email</p>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="font-medium text-gray-700 ">Phone Number</p>
                  <p className="text-gray-900">{userData.phoneNumber}</p>
                </div>

                {/* <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                <p className="font-medium text-gray-700">Email Confirmed</p>
                <p className="text-gray-900">
                  {userData.emailConfirmed ? "Yes" : "No"}
                </p>
              </div> */}
              </div>
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit Account
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-4 ml-4 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const EnhancedBlockInfoAccount = withErrorBoundary(BlockInfoAccount, {
  FallbackComponent,
});

export default EnhancedBlockInfoAccount;
