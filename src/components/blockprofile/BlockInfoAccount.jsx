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
          <p className="flex text-xl font-bold text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1 translate-y-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
          </svg>
            Your Roles
          </p>
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
                <p className="font-medium text-gray-700">
                  Email
                </p>
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
                  <p className="flex font-medium text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                    Name
                  </p>
                  <p className="text-gray-900 ">{userData.name}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="flex font-medium text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                  </svg>
                    Tên đăng nhập</p>
                  <p className="text-gray-900">{userData.userName}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="flex font-medium text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    Email
                  </p>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:-translate-y-1 hover:bg-slate-200 hover:scale-105">
                  <p className="flex font-medium text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                    Phone Number
                  </p>
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
