import React, { useState } from 'react';

const CreateQuestion = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    totalPoints: 0,
    answerFileURL: '',
    status: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/CreateQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Question created:', data);
      })
      .catch(error => console.error('Error creating question:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Create Question</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="block w-full mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="block w-full mt-1"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Total Points</label>
        <input type="number" name="totalPoints" value={form.totalPoints} onChange={handleChange} className="block w-full mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Answer File URL</label>
        <input type="text" name="answerFileURL" value={form.answerFileURL} onChange={handleChange} className="block w-full mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <input type="text" name="status" value={form.status} onChange={handleChange} className="block w-full mt-1" />
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500">Create</button>
    </form>
  );
};

export default CreateQuestion;
