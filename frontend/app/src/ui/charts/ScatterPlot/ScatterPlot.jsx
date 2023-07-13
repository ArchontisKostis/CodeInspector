import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

import './ScatterPlot.css';

const ScatterPlot = (props) => {
    const { data } = props;

    // Extract CC and CHURN values from data
    const chartData = data.map((item) => ({
        x: item.metrics.CHURN,
        y: item.metrics.CC,
        label: item.name,
        priority: item.priority,
        nloc: item.metrics.NLOC,
    }));

    // Register the required chart elements
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip); // Add Tooltip to the registered elements

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'CHURN',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'CC (Cyclomatic Complexity)',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let text = [];
                        text.push('File: ' + context.raw.label);
                        text.push('CC: ' + context.parsed.x);
                        text.push('CHURN: ' + context.parsed.y);
                        text.push('NLOC: ' + context.dataset.data[context.dataIndex].nloc);
                        text.push('Priority: ' + context.dataset.data[context.dataIndex].priority);

                        return text;
                    },
                },
            },
        },
    };

    const chartDataConfig = {
        datasets: [
            {
                data: chartData,
                pointBackgroundColor: chartData.map((item) => {
                    // Assign different colors based on priority
                    if (item.priority === 'HIGH') {
                        return 'red'; // Set the desired color for HIGH priority
                    } else if (item.priority === 'MEDIUM') {
                        return 'orange'; // Set the desired color for MEDIUM priority
                    } else if (item.priority === 'LOW') {
                        return 'blue'; // Set the desired color for LOW priority
                    } else {
                        return 'rgba(75, 192, 192, 1)'; // Default color for other priorities
                    }
                }),
                pointRadius: 4,
                hoverRadius: 5,
                hoverBackgroundColor: '#2E2A2A',
            },
        ],
    };

    return (
        <div className="scatter-plot-container">
            <Scatter className="scatter-plot" data={chartDataConfig} options={chartOptions} />
        </div>
    );
};

export default ScatterPlot;
