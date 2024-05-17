import React from 'react';
import QuestionList from '/src/components/blockquestion/QuestionList';
import CreateQuestion from '/src/components/blockquestion/CreateQuestion';

const Questions = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Question Management</h1>
      <CreateQuestion />
      <QuestionList />
      
    </div>
  );
};

export default Questions;
