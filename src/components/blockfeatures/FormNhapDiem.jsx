import { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa các classes Tailwind CSS chung
const containerClass = "w-full p-4 shadow-lg rounded-lg pr-4 laptop:w-full";
const labelClass =
  "block text-zinc-800 text-sm font-medium dark:text-black-300 flex items-center"; // Thêm class 'flex items-center' để căn SVG và label cùng một hàng
const inputBaseClass =
  "mt-1 mb-3 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-white dark:border-zinc-600 dark:text-black dark:focus:border-indigo-500";
const buttonClass =
  "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:bg-indigo-500 duration-300 w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 justify-center items-center laptop:w-full";

function FormField({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {/* Thêm SVG sau label */}
        {id === "studentId" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M3 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3Zm2.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 5.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 3.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM10 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10 8Zm-2.378 3c.346 0 .583-.343.395-.633A2.998 2.998 0 0 0 5.5 9a2.998 2.998 0 0 0-2.517 1.367c-.188.29.05.633.395.633h4.244Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {id === "evaluationScore" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M8.75 2.5a.75.75 0 0 0-1.5 0v.508a32.661 32.661 0 0 0-4.624.434.75.75 0 0 0 .246 1.48l.13-.021-1.188 4.75a.75.75 0 0 0 .33.817A3.487 3.487 0 0 0 4 11c.68 0 1.318-.195 1.856-.532a.75.75 0 0 0 .33-.818l-1.25-5a31.31 31.31 0 0 1 2.314-.141V12.012c-.882.027-1.752.104-2.607.226a.75.75 0 0 0 .213 1.485 22.188 22.188 0 0 1 6.288 0 .75.75 0 1 0 .213-1.485 23.657 23.657 0 0 0-2.607-.226V4.509c.779.018 1.55.066 2.314.14L9.814 9.65a.75.75 0 0 0 .329.818 3.487 3.487 0 0 0 1.856.532c.68 0 1.318-.195 1.856-.532a.75.75 0 0 0 .33-.818L12.997 4.9l.13.022a.75.75 0 1 0 .247-1.48 32.66 32.66 0 0 0-4.624-.434V2.5ZM3.42 9.415a2 2 0 0 0 1.16 0L4 7.092l-.58 2.323ZM12 9.5a2 2 0 0 1-.582-.085L12 7.092l.58 2.323A2 2 0 0 1 12 9.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {id === "teacherNotes" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
          </svg>
        )}
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows="4"
          className={inputBaseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className={inputBaseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

const FormNhapDiem = ({ generatedValues }) => {
  const [scoreAI, setScoreAI] = useState("");
  const [aiNotes, setAiNotes] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const username = "11166969";
  // const password = "60-dayfreetrial";
  // const basic = `${username}:${password}`;
  // const basicAuthHeader = `Basic ${btoa(basic)}`;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Sử dụng biểu thức chính quy để kiểm tra giá trị nhập vào
    const isValidInput = /^\d*$/.test(inputValue);

    // Kiểm tra xem giá trị nhập vào có phù hợp không
    if (isValidInput && Number(inputValue) >= 0 && Number(inputValue) <= 10) {
      // Nếu là số và không âm, cập nhật giá trị của trường input
      setValue(inputValue);
    }
    // Nếu không phải là số hoặc là số âm, không thực hiện cập nhật giá trị
  };

  // Sử dụng useEffect để set giá trị mặc định cho scoreAI và aiNotes khi generatedValues thay đổi
  useEffect(() => {
    // Kiểm tra xem generatedValues có giá trị không và có chứa key và value không
    if (
      generatedValues &&
      "Score" in generatedValues &&
      "Note" in generatedValues
    ) {
      setScoreAI(generatedValues.Score);
      setAiNotes(generatedValues.Note);
    }
  }, [generatedValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://bewbewbew-001-site1.ftempurl.com/api/demo/add-user",
        {
          studentID: document.getElementById("studentId").value,
          score: value,
          evaluation: document.getElementById("teacherNotes").value,
          scoreAI: scoreAI,
          note: aiNotes,
        },
        {
          headers: {
            //Authorization: basicAuthHeader,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Gửi thông tin thành công!");
      // Xử lý sau khi nhận phản hồi thành công từ máy chủ
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gửi thông tin thất bại. Vui lòng kiểm tra lại thông tin.");
      // Xử lý khi gặp lỗi
    }
    setIsLoading(false);
  };

  return (
    <div className={containerClass}>
      <form className="space-y-4 " onSubmit={handleSubmit}>
        <FormField
          id="studentId"
          label="Mã sinh viên"
          type="number"
          placeholder="Nhập mã sinh viên"
        />
        <FormField
          id="evaluationScore"
          label="Điểm đánh giá"
          type="number"
          placeholder="Nhập điểm đánh giá trên thang 10"
          value={value}
          onChange={handleChange}
        />
        <FormField
          type="textarea"
          id="teacherNotes"
          label="Ghi chú của giáo viên"
          placeholder="Nhập ghi chú"
        />
        {/* Truyền giá trị mặc định cho scoreAI và aiNotes */}
        <FormField
          id="scoreAI"
          label="Điểm AI"
          placeholder="Điểm AI..."
          value={scoreAI}
        />
        <FormField
          type="textarea"
          id="aiNotes"
          label="Ghi chú AI"
          placeholder="Ghi chú AI..."
          value={aiNotes}
        />
        <div className="w-full ">
          <button type="submit" className={`${buttonClass} ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}> {isLoading ? "Đang gửi..." : "Gửi thông tin"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 ml-3"
            >
              <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNhapDiem;
