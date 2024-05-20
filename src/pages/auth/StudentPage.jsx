import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentPage = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [currentUserResponse, assignmentsResponse] = await Promise.all([
        axios.get('https://yunom2834-001-site1.gtempurl.com/api/Account/Account', {
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`
          }
        }),
        axios.get('https://toqquangduc2-001-site1.jtempurl.com/api/get-coder-list')
      ]);
      
      setCurrentUser(currentUserResponse.data);

      const userEmail = currentUserResponse.data.email;
      const submittedAssignmentsCount = assignmentsResponse.data.filter(assignment => assignment.email === userEmail).length;
      setSubmittedAssignments(submittedAssignmentsCount);

      setTotalFiles(assignmentsResponse.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleReload = () => {
    fetchData();
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
            Tổng lượng file: <span className='font-extrabold text-gray-900'>{totalFiles}</span>
          </p>
        </div>
        <div className='flex items-center justify-center mt-5'>
          <button onClick={handleReload} disabled={loading} className={`px-4 py-2 bg-blue-500 text-white rounded ${loading && 'opacity-50 cursor-not-allowed'}`}>
            {loading ? 'Đang tải...' : 'Tải lại thông tin'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
