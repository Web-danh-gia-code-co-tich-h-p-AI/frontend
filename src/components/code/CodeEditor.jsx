import { Box, HStack, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../helper/constants";
import Output from "./Output";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const commonTextColor = "text-zinc-700";
const commonBorderColor = "border-zinc-300 dark:border-zinc-600";
const commonRounded = "rounded-md";
const commonPadding = "p-2";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const [fileContent, setFileContent] = useState("");
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
    if (fileContent.trim() !== "") {
      setIsLoading(true);
      try {
        setValue(fileContent);
      } catch (error) {
        console.error("Error generating content:", error);
        alert("Không thể đọc nội dung. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("File content is empty. Cannot submit.");
      alert("Vui lòng chọn một file chứa nội dung hợp lệ.");
    }
  }

  function handleCancel() {
    setFileContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const generateContent = async (value, output) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB4A_fWNEQPntj8TS4tmhDnw44hY_pY9uQ",
        {
          contents: [
            {
              parts: [
                {
                  text:
                    "Hãy tìm ra lỗi trong code hoặc tối ưu code và sửa nó trong đoạn code (Python, Java, JavaScript, TypeScript, PHP, C#) sau: " + 
                    "\n" +
                    "'" +
                    value +
                    "'" +
                    "\n" +
                    "và đây là output " +
                    "\n" +
                    output +
                    "\n" +
                    "Nếu đoạn code không lỗi hoặc đã tối ưu thì đánh giá hướng phát triển.",
                },
              ],
            },
          ],
        }
      );
      const data = response.data;
      if (data && data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;
        setGeneratedContent(generatedText);
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error generating content:", error);
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Box
        borderRadius="5px"
        border="1px"
        borderColor="green"
        p="5"
        spacing="5"
        bg="#ffffff"
      >
        <div className="mb-3">
          <h2 className="flex mt-5 text-lg font-semibold text-zinc-800">
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
              ref={fileInputRef}
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
                      d="M4.5 1.938a.75.75 0 0 1 1.025.274l.652 1.131c.351-.138.71-.233 1.073-.288V1.75a.75.75 0 0 1 1.5 0v1.306a5.03 5.03 0 0 1 1.072.288l.654-1.132a.75.75 0 1 1 1.298.75l-.652 1.13c.286.23.55.492.785.786l1.13-.653a.75.75 0 1 1 .75 1.3l-1.13.652c.137.351.233.71.288 1.073h1.305a.75.75 0 0 1 0 1.5h-1.306a5.032 5.032 0 0 1-.288 1.072l1.132.654a.75.75 0 0 1-.75 1.298l-1.13-.652c-.23.286-.492.55-.786.785l.652 1.13a.75.75 0 0 1-1.298.75l-.653-1.13c-.351.137-.71.233-1.073.288v1.305a.75.75 0 0 1-1.5 0v-1.306a5.032 5.032 0 0 1-1.072-.288l-.653 1.132a.75.75 0 0 1-1.3-.75l.653-1.13a4.966 4.966 0 0 1-.785-.786l-1.13.652a.75.75 0 1 1-.75-1.298l1.13-.654a5.03 5.03 0 0 1-.288-1.072H1.75a.75.75 0 0 1 0-1.5h1.306a5.03 5.03 0 0 1 .288-1.072l-.653-.653a.75.75 0 0 1 1.06-1.06Zm1.14 3.476a3.501 3.501 0 0 0 0 5.172L7.135 8 5.641 5.414ZM8.434 8.75 6.94 11.336a3.491 3.491 0 0 0 2.81-.305 3.49 3.49 0 0 0 1.669-2.281H8.433Zm2.987-1.5H8.433L6.94 4.664a3.501 3.501 0 0 1 4.48 2.586Z"
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
                className={`${commonPadding} ${commonRounded} bg-[#231F20] text-white hover:bg-gray-600 ml-2 hover:animate-pulse flex items-center`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <HStack spacing={4}>
          <Box w="50%">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Box bg="#1e1e1e" pt="2">
              <Editor
                height="75vh"
                theme="vs-dark"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                value={value}
                onMount={onMount}
                onChange={(value) => {
                  setValue(value);
                }}
              ></Editor>
            </Box>
          </Box>
          <Output editorRef={editorRef} language={language} setOutput={setOutput} /> {/* Pass setOutput */}
        </HStack>
        <Button
          onClick={() => generateContent(value, output)}
          colorScheme="blue"
          mt={4}
          className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Debugging..." : "Debug"}
        </Button>
        {isDataLoaded && (
          <Box mt={4} p={4} border="1px solid" borderColor="gray.300" borderRadius="md">
            <Text fontSize="lg" mb={2}>Generated Content:</Text>
            <Box bg="gray.100" p={4} borderRadius="md">
              <ReactMarkdown>{generatedContent}</ReactMarkdown>
            </Box>
          </Box>
        )}
        {errorMessage && (
          <Box mt={4} p={4} bg="red.100" border="1px solid" borderColor="red.300" borderRadius="md">
            <Text>{errorMessage}</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CodeEditor;
