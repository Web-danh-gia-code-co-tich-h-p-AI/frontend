import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const BlockInfoAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn muốn Thoát tài khoản?");
    if (!isConfirmed) {
      return; // Hủy hành động nếu người dùng chọn "Cancel"
    }
    Cookies.remove("token"); // Xóa cookie chứa token
    navigate("/login"); // Điều hướng người dùng đến trang đăng nhập
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
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
              <p className="text-gray-900">
                {userData.emailConfirmed ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 mt-4 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const EnhancedBlockInfoAccount = withErrorBoundary(BlockInfoAccount, {
  FallbackComponent,
});

export default EnhancedBlockInfoAccount;
