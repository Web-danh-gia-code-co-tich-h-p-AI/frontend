import React from 'react';
import StatisticsScore from '../../components/chart/StatisticsScore';
import AdminAccountDisplay from '../../components/adminaccount/AdminAccountDisplay';

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-3xl'>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <AdminAccountDisplay />
            <StatisticsScore />
        </div>
    );
};

export default Dashboard;