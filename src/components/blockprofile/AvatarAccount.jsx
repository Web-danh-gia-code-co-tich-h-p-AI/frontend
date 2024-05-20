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
        setAvatar(upload.target.result); // Set the uploaded image as avatar
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setBackground(upload.target.result); // Set the uploaded image as background
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarIconClick = () => {
    avatarInputRef.current.click(); // Trigger avatar file input click
  };

  const handleBackgroundIconClick = () => {
    backgroundInputRef.current.click(); // Trigger background file input click
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
            <div
              onClick={handleAvatarIconClick}
              className="absolute bottom-0 right-0 p-2 bg-black rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.5c-4.142 0-7.5 3.358-7.5 7.5S7.858 19.5 12 19.5 19.5 16.142 19.5 12 16.142 4.5 12 4.5zM12 1a11 11 0 110 22 11 11 0 010-22zm-2 11v.01M12 7v.01M8 12v.01M10 12v.01M14 12v.01M16 12v.01M10 16v.01M12 16v.01M14 16v.01"
                />
              </svg>
            </div>
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
          className="top-0 left-0 p-2 m-4 bg-black rounded-full cursor-pointer tablet:absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.5c-4.142 0-7.5 3.358-7.5 7.5S7.858 19.5 12 19.5 19.5 16.142 19.5 12 16.142 4.5 12 4.5zM12 1a11 11 0 110 22 11 11 0 010-22zm-2 11v.01M12 7v.01M8 12v.01M10 12v.01M14 12v.01M16 12v.01M10 16v.01M12 16v.01M14 16v.01"
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
