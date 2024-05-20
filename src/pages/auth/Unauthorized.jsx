import React from "react";
const containerClasses =
  "min-h-screen flex flex-col items-center justify-center bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white";
const titleClasses = "text-6xl font-bold mb-4";
const subTitleClasses = "text-4xl mb-2";
const textClasses = "text-lg";

const Unauthorized = () => {
  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>Oops!</h1>
      <p className={subTitleClasses}>403 Permission Denied</p>
      <p className={textClasses}>
        Sorry, you do not have access to this page, please contact your
        administrator.
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

export default Unauthorized;
