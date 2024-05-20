import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('https://yunom2834-001-site1.gtempurl.com/api/Account/Account', {
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchSubmittedAssignments = async () => {
      try {
        const response = await axios.get('https://toqquangduc2-001-site1.jtempurl.com/api/get-coder-list');
        const assignments = response.data;

        if (currentUser) {
          const userEmail = currentUser.email;
          const count = assignments.filter(assignment => assignment.email === userEmail).length;
          setSubmittedAssignments(count);
        }
      } catch (error) {
        console.error('Error fetching submitted assignments:', error);
      }
    };

    const fetchTotalFiles = async () => {
      try {
        const response = await axios.get('https://toqquangduc2-001-site1.jtempurl.com/api/get-coder-list');
        const files = response.data;
        setTotalFiles(files.length);
      } catch (error) {
        console.error('Error fetching total files:', error);
      }
    };

    fetchCurrentUser().then(() => {
      fetchSubmittedAssignments();
      fetchTotalFiles();
    });
  }, [currentUser]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='m-3 text-3xl font-extrabold text-gray-900'>Student Dashboard</h1>
      <div className='w-2/3 p-6 m-3 bg-white rounded-lg shadow-md md:w-1/3'>
        <div className='text-xl font-bold text-center text-gray-800'>Xin chào, {currentUser?.name}</div>
        <div className='flex items-center justify-center mt-5'>
          <p className='w-full p-6 text-lg text-center bg-gray-200 rounded-lg'>
            Số bài bạn đã nộp là: <span className='font-extrabold text-gray-900'>{submittedAssignments}</span>
          </p>
        </div>
        <div className='flex items-center justify-center mt-5'>
          <p className='w-full p-6 text-lg text-center bg-gray-200 rounded-lg'>
            Tổng file: <span className='font-extrabold text-gray-900'>{totalFiles}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
