import { useEffect, useState } from "react";
import UpdateQuestion from "./UpdateQuestion";
import FallbackComponent from "../../utils/FallbackComponent";
import { withErrorBoundary } from "react-error-boundary";
import Cookies from "js-cookie";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recordsPerPage = 5;
  const token = Cookies.get("token");

  const fetchQuestions = () => {
    setIsLoading(true); // Start loading
    fetch("https://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/GetAllQuestion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add your token here if needed, example:
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error))
      .finally(() => setIsLoading(false)); // End loading
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDetails = (question) => {
    setSelectedQuestion(question);
  };
  //https://yunom2834-001-site1.gtempurl.com/api
  //http://localhost:5136/api
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xoá?");
    if (confirmDelete) {
      fetch(`https://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/DeleteQuestion${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setQuestions(questions.filter((question) => question.id !== id));
            alert("Xóa câu hỏi thành công!");
          } else {
            console.error("Error deleting question:", response.statusText);
          }
        })
        .catch((error) => console.error("Error deleting question:", error));
    } else {
      return;
    }
  };

  const handleSave = (updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setSelectedQuestion(null);
    alert("Cập nhật câu hỏi thành công!");
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

  const filteredQuestions = questions.filter(
    (question) =>
      question.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.id.toString().includes(searchQuery.toLowerCase())
  );

  // Calculate the current records to display based on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredQuestions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredQuestions.length / recordsPerPage);

  return (
    <div className="h-full p-4 px-6 lg:px-8">
      <h2 className="flex mb-4 text-2xl font-bold ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-1 translate-y-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
        Danh sách câu hỏi
      </h2>
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
          className={`px-4 py-2 ml-4 text-white rounded flex ${
            isLoading ? "bg-gray-400" : "bg-green-500"
          }`}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 mr-1 ${isLoading ? "animate-spin" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          {isLoading ? "Loading..." : "Reload"}
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
            {currentRecords.map((question) => (
              <tr key={question.id}>
                <td className="px-4 py-2 border">{question.id}</td>
                <td className="px-4 py-2 border">
                  <pre className="w-16 truncate">{question.name}</pre>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="px-2 py-1 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleDetails(question)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 tablet:w-6 tablet:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={() => handleDelete(question.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 tablet:w-6 tablet:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
              className={`px-3 py-1 mx-1 border rounded hover:-translate-y-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
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

const EnhancedQuestionList = withErrorBoundary(QuestionList, {
  FallbackComponent,
});

export default EnhancedQuestionList;
