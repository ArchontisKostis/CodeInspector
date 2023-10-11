import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';

import './BarChart.css';

// Register required scales
Chart.register(LinearScale, CategoryScale, BarElement);


const BarChart = ({ data }) => {
    // Filter out the "UNKNOWN" category from the data
    const filteredData = data.filter((entry) => entry.change_category !== 'UNKNOWN');

    // Define all possible change categories
    const allCategories = ['EXCELLENT', 'GOOD', 'FAIR', 'POOR'];

    // Initialize the categoryCounts object with all possible categories and their count set to zero
    let categoryCounts = {};
    allCategories.forEach((category) => {
        categoryCounts[category] = 0;
    });

    // Extract the change categories from the data and update the categoryCounts
    const changeCategories = filteredData.map((entry) => {
        categoryCounts[entry.change_category]++;
        return entry.change_category;
    });

    // Specific colors for each category
    const categoryColors = {
        EXCELLENT: '#2DFA3A99',
        GOOD: '#309CEA99',
        FAIR: '#FFF000DD',
        POOR: '#F6003399',
        UNKNOWN: '#C230EA99',
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                label: 'Change Category Counts',
                data: Object.values(categoryCounts),
                backgroundColor: Object.keys(categoryCounts).map(category => categoryColors[category]),
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
