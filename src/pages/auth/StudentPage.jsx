import React from 'react';

// Constants for repeated class strings
const containerClasses = "bg-white dark:bg-zinc-700 shadow rounded-lg p-4";
const titleClasses = "text-lg font-semibold text-zinc-800 dark:text-white";
const valueClasses = "text-3xl font-bold";

// Data for each card
const cardData = [
    {
        title: "Điểm trung bình",
        value: "8.5",
        valueColor: "text-blue-600 dark:text-blue-300",
        imgSrc: "https://placehold.co/100x100",
        altText: "Average Score"
    },
    {
        title: "Số bài đã nộp",
        value: "15",
        valueColor: "text-green-600 dark:text-green-300",
        imgSrc: "https://placehold.co/100x100",
        altText: "Submitted Assignments"
    },
    {
        title: "Số bài chưa hoàn thành",
        value: "3",
        valueColor: "text-red-600 dark:text-red-300",
        imgSrc: "https://placehold.co/100x100",
        altText: "Incomplete Assignments"
    },
    {
        title: "Số bài đã hoàn thành",
        value: "12",
        valueColor: "text-blue-600 dark:text-blue-300",
        imgSrc: "https://placehold.co/100x100",
        altText: "Completed Assignments"
    },
    {
        title: "Số bài bị muộn",
        value: "2",
        valueColor: "text-yellow-600 dark:text-yellow-300",
        imgSrc: "https://placehold.co/100x100",
        altText: "Late Assignments"
    }
];

// Card component
const Card = ({ title, value, valueColor, imgSrc, altText }) => (
    <div className={containerClasses}>
        <div className="flex items-center justify-between">
            <div>
                <h4 className={titleClasses}>{title}</h4>
                <div className={`${valueClasses} ${valueColor}`}>{value}</div>
            </div>
            <img className="w-12 h-12" src={imgSrc} alt={altText} />
        </div>
    </div>
);

// Main component
const Dashboard = () => {
    return (
        <div className="min-h-screen p-4 bg-zinc-100">
          <div className='p-3 mb-3 text-3xl font-semibold'>Thông tin chính</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cardData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;