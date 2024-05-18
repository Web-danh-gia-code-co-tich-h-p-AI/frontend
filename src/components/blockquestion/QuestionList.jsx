import React, { useEffect, useState } from 'react';
import UpdateQuestion from './UpdateQuestion';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recordsPerPage = 5;

  const fetchQuestions = () => {
    setIsLoading(true); // Start loading
    fetch('http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/GetAllQuestion')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error))
      .finally(() => setIsLoading(false)); // End loading
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDetails = (question) => {
    setSelectedQuestion(question);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn xoá?');
    if (confirmDelete) {
      fetch(`http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/DeleteQuestion${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setQuestions(questions.filter(question => question.id !== id));
            alert('Xóa câu hỏi thành công!');
          } else {
            console.error('Error deleting question:', response.statusText);
          }
        })
        .catch(error => console.error('Error deleting question:', error));
    } else {
      return;
    }
  };

  const handleSave = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setSelectedQuestion(null);
    alert('Cập nhật câu hỏi thành công!');
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
    question.id.toString().includes(searchQuery.toLowerCase())
  );

  // Calculate the current records to display based on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredQuestions.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredQuestions.length / recordsPerPage);

  return (
    <div className="h-full p-4 px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold">Danh sách câu hỏi</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
        <button 
          onClick={fetchQuestions}
          className={`px-4 py-2 ml-4 text-white rounded ${isLoading ? 'bg-gray-400' : 'bg-green-500'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Reload'}
        </button>
      </div>
      <div className="laptop:relative h-96">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map(question => (
              <tr key={question.id}>
                <td className="px-4 py-2 border">{question.id}</td>
                <td className="px-4 py-2 border"><pre className='w-16 truncate'>{question.name}</pre></td>
                <td className="px-4 py-2 border">
                  <button 
                    className="px-2 py-1 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleDetails(question)}
                  >
                    Details
                  </button>
                  <button 
                    className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={() => handleDelete(question.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-0 flex justify-center mt-4 laptop:absolute">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 border rounded hover:-translate-y-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedQuestion && (
        <UpdateQuestion 
          question={selectedQuestion} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}
    </div>
  );
};

export default QuestionList;
