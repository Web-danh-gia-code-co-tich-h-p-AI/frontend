import React from "react";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const commonTextColor = "text-zinc-700";
const commonBorderColor = "border-zinc-300 dark:border-zinc-600";
const commonRounded = "rounded-md";
const commonPadding = "p-2";

const BlockUpload = ({ generateContent }) => {
  const [fileContent, setFileContent] = useState("");
  const [taskRequired, setTaskRequired] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(file);
  }

  async function handleUpload() {
    if (taskRequired.trim() === "") {
      alert("Vui lòng nhập yêu cầu đề bài (bắt buộc) !");
      return; // Stop function execution if taskRequired is empty
    }

    if (fileContent.trim() !== "") {
      setIsLoading(true); // Đặt trạng thái isLoading thành true khi bắt đầu upload
      try {
        await generateContent(fileContent, taskRequired);
      } catch (error) {
        console.error("Error generating content:", error);
        alert("Tải nội dung thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false); // Đặt trạng thái isLoading thành false khi upload hoàn tất
      }
    } else {
      console.log("Không có dữ liệu !");
      alert("Vui lòng chọn một file có nội dung.");
    }
  }

  function handleCancel() {
    setFileContent("");
    setTaskRequired("");
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="w-full p-4 border rounded-lg shadow-lg min-h-max laptop:w-1/2">
      <h2 className="flex text-lg font-semibold text-zinc-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm1 2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.28.53L8 9.06l-1.72 1.72A.75.75 0 0 1 5 10.25v-6Z"
            clipRule="evenodd"
          />
        </svg>
        Nhập yêu cầu đề bài
      </h2>
      <div className="flex items-center mt-1">
        <input
          type="text"
          value={taskRequired}
          onChange={(e) => setTaskRequired(e.target.value)}
          placeholder="Nhập đề bài"
          className={`${commonPadding} mb-3 w-full ${commonBorderColor} ${commonRounded} bg-slate-100 shadow-sm text-sm leading-4 font-medium ${commonTextColor}`}
        />
      </div>
      <h2 className="flex text-lg font-semibold text-zinc-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm4 9.5a.75.75 0 0 1-.75-.75V8.06l-.72.72a.75.75 0 0 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72v2.69a.75.75 0 0 1-.75.75Z"
            clipRule="evenodd"
          />
        </svg>
        Upload File
      </h2>
      <div className="items-center w-full mt-1 laptop:flex">
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef} // Assign ref to the input element
          className={`${commonPadding} ${commonBorderColor} w-full ${commonRounded} shadow-sm text-sm leading-4 font-medium ${commonTextColor} bg-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-400 file:text-white hover:file:bg-slate-600 hover:file:cursor-pointer`}
        />
        <div className="flex justify-between mt-6 laptop:ml-12 laptop:flex laptop:mt-0">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`${commonPadding} ${commonRounded} bg-green-500 text-white hover:bg-green-600 hover:animate-pulse flex items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 mr-1 animate-spin"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 1.938a.75.75 0 0 1 1.025.274l.652 1.131c.351-.138.71-.233 1.073-.288V1.75a.75.75 0 0 1 1.5 0v1.306a5.03 5.03 0 0 1 1.072.288l.654-1.132a.75.75 0 1 1 1.298.75l-.652 1.13c.286.23.55.492.785.786l1.13-.653a.75.75 0 1 1 .75 1.3l-1.13.652c.137.351.233.71.288 1.073h1.305a.75.75 0 0 1 0 1.5h-1.306a5.032 5.032 0 0 1-.288 1.072l1.132.654a.75.75 0 0 1-.75 1.298l-1.13-.652c-.23.286-.492.55-.786.785l.652 1.13a.75.75 0 0 1-1.298.75l-.653-1.13c-.351.137-.71.233-1.073.288v1.305a.75.75 0 0 1-1.5 0v-1.306a5.032 5.032 0 0 1-1.072-.288l-.653 1.132a.75.75 0 0 1-1.3-.75l.653-1.13a4.966 4.966 0 0 1-.785-.786l-1.13.652a.75.75 0 0 1-.75-1.298l1.13-.653a4.965 4.965 0 0 1-.288-1.073H1.75a.75.75 0 0 1 0-1.5h1.306a5.03 5.03 0 0 1 .288-1.072l-.653-.653a.75.75 0 0 1 1.06-1.06Zm1.14 3.476a3.501 3.501 0 0 0 0 5.172L7.135 8 5.641 5.414ZM8.434 8.75 6.94 11.336a3.491 3.491 0 0 0 2.81-.305 3.49 3.49 0 0 0 1.669-2.281H8.433Zm2.987-1.5H8.433L6.94 4.664a3.501 3.501 0 0 1 4.48 2.586Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={handleCancel}
            className={`${commonPadding} ${commonRounded} bg-gray-500 text-white hover:bg-gray-600 ml-2 hover:animate-pulse flex items-center`}
          >
            Cancel
          </button>
        </div>
      </div>
      {fileContent && (
        <div className="max-w-full p-4 border rounded-lg bg-zinc-700 mt-7">
          <h3 className="mb-3 font-semibold text-white">File Content:</h3>
          <pre className="overflow-auto text-black bg-white rounded-lg max-h-80">
            <div className="p-3">{fileContent}</div>
          </pre>
        </div>
      )}
    </div>
  );
};

BlockUpload.propTypes = {
  generateContent: PropTypes.func,
};

const EnhancedBlockUpload = withErrorBoundary(BlockUpload, {
  FallbackComponent,
});

export default EnhancedBlockUpload;
