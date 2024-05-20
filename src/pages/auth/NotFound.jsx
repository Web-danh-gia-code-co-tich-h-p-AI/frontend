import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-red-600">404</h1>
      <p className="mb-2 text-2xl text-gray-600">Page not found</p>
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Go back to home page
      </a>
    </div>
  );
};

export default NotFound;
