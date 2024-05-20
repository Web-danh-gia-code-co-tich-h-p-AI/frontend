import React from "react";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const BlockInfoAccount = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [background, setBackground] = useState(null); // State for the background image
  const avatarInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

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

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setAvatar(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setBackground(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarIconClick = () => {
    avatarInputRef.current.click();
  };

  const handleBackgroundIconClick = () => {
    backgroundInputRef.current.click();
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex items-center justify-center h-auto tablet:justify-start bg-slate-400 tablet:items-end"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="tablet:relative">
        <div className="relative flex flex-col items-center p-6 m-12 bg-white border-4 border-orange-600 rounded-lg shadow-lg laptop:translate-y-28 tablet:translate-y-24 translate-y-36">
          <div className="relative flex items-center justify-center mb-4 overflow-hidden bg-gray-500 border-orange-600 border-double rounded-full shadow-2xl w-36 h-36 border-x-8">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {userData.name.charAt(0)}
              </span>
            )}
          </div>
          <div
            onClick={handleAvatarIconClick}
            className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-black">{userData.name}</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            ref={avatarInputRef}
            className="hidden"
          />
        </div>
        <div
          onClick={handleBackgroundIconClick}
          className="top-0 left-0 p-2 m-4 rounded-full cursor-pointer tablet:absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          ref={backgroundInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

const EnhancedBlockInfoAccount = withErrorBoundary(BlockInfoAccount, {
  FallbackComponent,
});

export default EnhancedBlockInfoAccount;
