import React from 'react';


const AssignmentList = ({ assignments }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Assignments</h2>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index} className="p-2 border-b last:border-b-0">
            <p className="font-medium text-gray-700">{assignment.title}</p>
            <p className="text-gray-500">Due Date: {assignment.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GradeTable = ({ grades }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Grades</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Assignment</th>
            <th className="px-4 py-2 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border-b">{grade.assignment}</td>
              <td className="px-4 py-2 border-b">{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentPage = () => {
  const assignments = [
    { title: 'Assignment 1', dueDate: '2024-05-20' },
    { title: 'Assignment 2', dueDate: '2024-06-10' },
  ];

  const grades = [
    { assignment: 'Assignment 1', grade: 'A' },
    { assignment: 'Assignment 2', grade: 'B+' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AssignmentList assignments={assignments} />
          <GradeTable grades={grades} />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
