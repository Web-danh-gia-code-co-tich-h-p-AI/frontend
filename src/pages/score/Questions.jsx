import React from 'react';
import QuestionList from '/src/components/blockquestion/QuestionList';
import CreateQuestion from '/src/components/blockquestion/CreateQuestion';

const Questions = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="flex p-4 mb-8 text-3xl font-bold rounded-lg bg-zinc-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mr-2 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
        Quản lý câu hỏi
      </h1>
        <div className="laptop:grid laptop:grid-cols-2 laptop:gap-4">
          <CreateQuestion />
          <QuestionList />
        </div>
    </div>
  );
};

export default Questions;
