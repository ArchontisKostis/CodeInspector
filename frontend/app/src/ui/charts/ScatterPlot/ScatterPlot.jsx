import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

import './ScatterPlot.css';

// Register the required chart elements
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const ScatterPlot = (props) => {
    const { data } = props;

    // Extract CC and CHURN values from data
    const chartData = data.map((item) => ({
        x: item.metrics.CHURN,
        y: item.metrics.CC,
        label: item.name,
        priority: item.priority,
    }));

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'CC (Cyclomatic Complexity)',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'CHURN',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Extract the label and priority from the data
                        const label = context.dataset.data[context.dataIndex].label;
                        const priority = context.dataset.data[context.dataIndex].priority;

                        // Return the label and priority as the tooltip
                        console.log(label, priority);
                    }
                }
            }
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
                pointRadius: 6,
            },
        ],
    };

    return (
        <div className="scatter-plot-container">
            <Scatter
                className="scatter-plot"
                data={chartDataConfig}
                options={chartOptions}
            />
        </div>
    );
};

export default ScatterPlot;
