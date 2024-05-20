import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const UpdateQuestion = ({ question, onSave, onCancel }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    totalPoints: 0,
    answerFileURL: "",
    status: "",
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
  //https://yunom2834-001-site1.gtempurl.com/api
  //localhost:5136/api
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDataLoaded(true);
    fetch(
      `https://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/UpdateQuestion${form.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json().catch(() => ({})); // Handle cases where the response is empty
      })
      .then((data) => {
        console.log("Question updated:", data);
        onSave(data);
        setIsDataLoaded(false);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-4 border rounded-lg shadow-lg"
    >
      <h2 className="mb-4 text-2xl font-bold">Chi tiết và Cập nhật câu hỏi</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tên câu hỏi *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="block w-full p-2 mt-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="block w-full p-2 mt-1 border rounded"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Điểm tối đa *
        </label>
        <input
          type="number"
          name="totalPoints"
          value={form.totalPoints}
          onChange={handleChange}
          className="block w-full p-2 mt-1 border rounded"
        />
      </div>
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
          {isDataLoaded ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

UpdateQuestion.propTypes = {
  question: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

const EnhancedUpdateQuestion = withErrorBoundary(UpdateQuestion, {
  FallbackComponent,
});

export default EnhancedUpdateQuestion;
