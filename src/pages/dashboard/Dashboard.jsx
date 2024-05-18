import React from 'react';
import StatisticsScore from '../../components/chart/StatisticsScore';

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-3xl'>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <StatisticsScore />
        </div>
    );
};

export default Dashboard;