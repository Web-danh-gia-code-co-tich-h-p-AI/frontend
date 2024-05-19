import React, { useState, useEffect } from 'react';

const UpdateQuestion = ({ question, onSave, onCancel }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3YjBkYmEyLWE4NzctNDllMS05Mzk1LWI1ZDVlM2UyYjlkMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTdXBlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlRlYWNoZXIiLCJBZG1pbiIsIlN1cGVyQWRtaW4iLCJTdHVkZW50Il0sImV4cCI6MTcxNjE5NjY0NywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMDIifQ.zOIP0voT79oOdpLhCPRrxj0e6OJ6ZIHUYCCX2-haD3w';
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    totalPoints: 0,
    answerFileURL: '',
    status: '',
  });

  useEffect(() => {
    if (question) {
      setForm({
        id: question.id,
        name: question.name,
        description: question.description,
        totalPoints: question.totalPoints,
        answerFileURL: question.answerFileURL,
        status: question.status,
      });
    }
  }, [question]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDataLoaded(true);
    fetch(`http://localhost:5136/api/TeacherQuestion/UpdateQuestion${form.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3YjBkYmEyLWE4NzctNDllMS05Mzk1LWI1ZDVlM2UyYjlkMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTdXBlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlRlYWNoZXIiLCJBZG1pbiIsIlN1cGVyQWRtaW4iLCJTdHVkZW50Il0sImV4cCI6MTcxNjE5NjY0NywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMDIifQ.zOIP0voT79oOdpLhCPRrxj0e6OJ6ZIHUYCCX2-haD3w'
      },
      body: JSON.stringify(form),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json().catch(() => ({})); // Handle cases where the response is empty
      })
      .then(data => {
        console.log('Question updated:', data);
        onSave(data);
        setIsDataLoaded(false);
      })
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mt-4 border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Chi tiết và Cập nhật câu hỏi</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tên câu hỏi *</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="block w-full p-2 mt-1 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="block w-full p-2 mt-1 border rounded"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Điểm tối đa *</label>
        <input type="number" name="totalPoints" value={form.totalPoints} onChange={handleChange} className="block w-full p-2 mt-1 border rounded" />
      </div>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Answer File URL</label>
        <input type="text" name="answerFileURL" value={form.answerFileURL} onChange={handleChange} className="block w-full mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <input type="text" name="status" value={form.status} onChange={handleChange} className="block w-full mt-1" />
      </div> */}
      <div className="flex justify-end">
        <button 
          type="button" 
          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isDataLoaded ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default UpdateQuestion;
