import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

const BlockInfoAccount = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [background, setBackground] = useState(null); // State for the background image
    const avatarInputRef = useRef(null);
    const backgroundInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
        const token = Cookies.get('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5136/api/Account/Account', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });

            if (!response.ok) {
            throw new Error('Failed to fetch user data');
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
        <div className="flex tablet:justify-start bg-slate-400 justify-center tablet:items-end items-center h-auto" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="tablet:relative">
            <div className="bg-white rounded-lg m-12 p-6 shadow-lg border-4 border-orange-600 flex flex-col items-center relative laptop:translate-y-28 tablet:translate-y-24 translate-y-36">
            <div className="w-36 h-36 bg-gray-500 rounded-full border-x-8 border-double border-orange-600 shadow-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                <span className="text-2xl text-white font-bold">{userData.name.charAt(0)}</span>
                )}
                <div 
                onClick={handleAvatarIconClick}
                className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer"
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
            <h2 className="text-black text-xl font-bold">{userData.name}</h2>
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
            className="tablet:absolute top-0 left-0 m-4 bg-black p-2 rounded-full cursor-pointer"
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

export default BlockInfoAccount;
