import React from 'react';
import StatisticsScore from '../../components/chart/StatisticsScore';
import AdminAccountDisplay from '../../components/adminaccount/AdminAccountDisplay';

const Dashboard = () => {
    return (
        <div>
            <div className='m-5 font-bold'>
                <h1 className='text-3xl'>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
            </div>
            <AdminAccountDisplay />
            <StatisticsScore />
        </div>
    );
};

export default Dashboard;