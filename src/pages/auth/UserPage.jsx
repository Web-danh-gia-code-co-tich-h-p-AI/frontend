import React from "react";
import { Link } from "react-router-dom";
// Example service data
const services = [
  {
    id: 1,
    title: "Học sinh, sinh viên",
    description: "Code trực tiếp, đánh giá code trực tiếp, làm và nộp bài ...",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Giáo viên",
    description: "Chấm code tự động, tạo bài tập, ...",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m-6-3a9 9 0 110-8 9 9 0 018 0m0 12a9 9 0 100-8 9 9 0 00-8 0"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Quản lý code, quản lý điểm",
    description: "Quản lý các file code và điểm số của học sinh, sinh viên ..",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4H9v-2h3V7l3 3-2 2h-1v4z"
        />
      </svg>
    ),
  },
];

const UserServices = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-[#eeeeee] sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Chọn Dịch Vụ</h1>
            </div>
            <div className="divide-y divide-gray-200">
              {services.map((service) => (
                <div key={service.id} className="py-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{service.icon}</div>
                    <div>
                      <h2 className="text-lg font-semibold">{service.title}</h2>
                      <p className="mt-2 text-gray-600">
                        {service.description}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Link
                        to="/src/pages/home/LandingHome.jsx"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Chọn
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserServices;
