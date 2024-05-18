import React from 'react';
import QuestionList from '/src/components/blockquestion/QuestionList';
import CreateQuestion from '/src/components/blockquestion/CreateQuestion';

const Questions = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold bg-zinc-300 p-4">Quản lý câu hỏi</h1>
        <div className="grid grid-cols-2 gap-4">
          <CreateQuestion />
          <QuestionList />
        </div>
    </div>
  );
};

export default Questions;
