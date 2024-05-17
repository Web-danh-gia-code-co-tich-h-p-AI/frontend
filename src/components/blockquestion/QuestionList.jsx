import React, { useEffect, useState } from 'react';
import UpdateQuestion from './UpdateQuestion';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 5;

  useEffect(() => {
    fetch('http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/GetAllQuestion')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleDetails = (question) => {
    setSelectedQuestion(question);
  };

  const handleDelete = (id) => {
    fetch(`http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/DeleteQuestion${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setQuestions(questions.filter(question => question.id !== id));
        } else {
          console.error('Error deleting question:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  const handleSave = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setSelectedQuestion(null);
  };

  const handleCancel = () => {
    setSelectedQuestion(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredQuestions = questions.filter(question =>
    question.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the current records to display based on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredQuestions.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredQuestions.length / recordsPerPage);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Questions</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(question => (
            <tr key={question.id}>
              <td className="border px-4 py-2">{question.id}</td>
              <td className="border px-4 py-2">{question.name}</td>
              <td className="border px-4 py-2">{question.description}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleDetails(question)}
                >
                  Details
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuestion && (
        <UpdateQuestion 
          question={selectedQuestion} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
