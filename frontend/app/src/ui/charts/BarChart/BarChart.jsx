import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';

import './BarChart.css';

// Register required scales
Chart.register(LinearScale, CategoryScale, BarElement);


const BarChart = ({ data }) => {
    // Extract the change categories from the data
    const changeCategories = data.map((entry) => entry.change_category);

    // Count the occurrences of each change category
    const categoryCounts = changeCategories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    // Prepare data for the bar chart
    const chartData = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                label: 'Change Category Counts',
                data: Object.values(categoryCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // POOR
                    'rgba(54, 162, 235, 0.6)', // UNKNOWN
                    'rgba(75, 192, 192, 0.6)', // EXCELLENT
                    // Add more colors here for other change categories
                ],
            },
        ],
    };

    // Options for the bar chart
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 1,
            },
        },
    };

    return (
        <div className="bar-chart">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
