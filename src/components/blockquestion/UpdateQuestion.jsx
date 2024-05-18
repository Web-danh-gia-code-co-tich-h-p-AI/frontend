import React, { useState, useEffect } from 'react';

const UpdateQuestion = ({ question, onSave, onCancel }) => {
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
    fetch(`http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/UpdateQuestion${form.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
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
      })
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mt-4 border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Update Question</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="block w-full p-2 mt-1 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="block w-full p-2 mt-1 border rounded"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Total Points</label>
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
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateQuestion;
