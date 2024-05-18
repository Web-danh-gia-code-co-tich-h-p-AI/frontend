import React from 'react';
import QuestionList from '/src/components/blockquestion/QuestionList';
import CreateQuestion from '/src/components/blockquestion/CreateQuestion';

const Questions = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="p-4 mb-8 text-3xl font-bold rounded-lg bg-zinc-300">Quản lý câu hỏi</h1>
        <div className="laptop:grid laptop:grid-cols-2 laptop:gap-4">
          <CreateQuestion />
          <QuestionList />
        </div>
    </div>
  );
};

export default Questions;
