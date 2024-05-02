import React, { useState } from 'react';
import Header from '../../layout/headerfooter/Header';
import Footer from '../../layout/headerfooter/Footer';
import BlockUpload from '../../components/blockfeatures/BlockUpload';
import FormNhapDiem from '../../components/blockfeatures/FormNhapDiem';
import BlockXemDiem from '../../components/blockfeatures/BlockXemDiem';
import axios from 'axios';

const ChamDiem = () => {
  const [generatedValues, setGeneratedValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const generateContent = async (inputContent,taskRequired) => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB4A_fWNEQPntj8TS4tmhDnw44hY_pY9uQ',
        {
          contents: [
            {
              parts: [
                {
                  text: "Hãy đánh giá đoạn code Python sau khắt khe nhất trên thang điểm 10 bằng testcase theo đề bài: "+ "'" + taskRequired + "'" + ".Sau đó chỉ trả response của bạn cho tôi ở định dạng JSON bằng tiếng Việt gồm các trường đóng vai trò là Key: Score, Note (max 30 kí tự): " + "\n" + inputContent + "\n" +"Nếu bên trên không phải là code Python hoặc sai yêu cầu đề bài thì đánh giá 0 điểm và nêu chi tiết như ở định dạng json yêu cầu trên.",
                },
              ],
            },
          ],
        }
      );
      const data = response.data;
      if (data && data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;
        parseAndSetGeneratedValues(generatedText);
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error generating content:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const parseAndSetGeneratedValues = (generatedText) => {
    try {
      const cleanedText = generatedText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
      const parsedValues = JSON.parse(cleanedText);
      setGeneratedValues(parsedValues);
      setErrorMessage('');
    } catch (error) {
      console.error('Error parsing generated content:', error);
      setGeneratedValues({});
      setErrorMessage(<span style={{ color: 'yellow', margin:'100px', backgroundColor:"purple", padding:"6px", borderRadius:"4px", borderColor:"yellow", border:"1px solid"}}>Đoạn code chưa hoàn thiện hoặc lỗi syntax.</span>);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="max-w-screen">
      <Header />
      <div className="w-full bg-white p-9">
        <main className="flex flex-wrap space-y-6">
          <div className="w-full laptop:flex">
            <BlockUpload generateContent={generateContent} />
            <div className='w-full pt-2 mb-4 rounded-lg laptop:w-1/2 laptop:pl-6 text-zinc-800'>
              <h2 className="flex text-lg font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clipRule="evenodd" />
                </svg>
                Đánh giá của AI:
              </h2>
              <div className='w-full'>
              {isDataLoaded ? (
                  // Khối dữ liệu
                  <div className="w-full">
                    <ul className="mt-4">
                      {Object.entries(generatedValues).map(([key, value]) => (
                        <li key={key} className="mb-2">
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Khối loading
                  <div className={`w-full hidden laptop:block p-4 rounded-md ${!isDataLoaded ? '' : 'hidden'}`}>
                    <div className="flex space-x-4 animate-pulse">
                      <div className="flex-1 py-1 space-y-6">
                        <div className="h-2 rounded bg-slate-700"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 col-span-2 rounded bg-slate-700"></div>
                            <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                          </div>
                          <div className="h-2 rounded bg-slate-700"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="laptop:flex laptop:flex-wrap laptop:w-full ">
            <div className='w-full p-1 laptop:w-1/3'>
              <FormNhapDiem generatedValues={generatedValues} />
            </div>
            <div className='w-full p-1 laptop:w-2/3'>
              <BlockXemDiem />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>

  );
};

export default ChamDiem;
