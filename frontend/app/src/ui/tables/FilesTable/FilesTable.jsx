import React from 'react';

import './FilesTable.css';

const FilesTable = (props) => {
    const { files } = props;

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'NOT_SET':
                return 'gray';
            case 'LOW':
                return 'green';
            case 'NORMAL':
                return 'orange';
            case 'MEDIUM':
                return 'blue';
            case 'HIGH':
                return 'red';
            case 'UNKNOWN':
                return 'purple';
            default:
                return 'gray';
        }
    };

    // Sort the files based on priority (from high to low)
    const sortedFiles = [...files].sort((a, b) => {
        const priorityOrder = {
            HIGH: 1,
            MEDIUM: 2,
            NORMAL: 3,
            LOW: 4,
            NOT_SET: 5,
            UNKNOWN: 6,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>CC</th>
                <th>NLOC</th>
                <th>CHURN</th>
                <th>Priority</th>
            </tr>
            </thead>
            <tbody>
            {sortedFiles.map((file, index) => (
                <tr key={index}>
                    <td className="table-item-filename">{file.name}</td>
                    <td>{file.metrics.CC}</td>
                    <td>{file.metrics.NLOC}</td>
                    <td>{file.metrics.CHURN}</td>
                    <td>
                        <span className="priority-label"
                                style={{ backgroundColor: getPriorityColor(file.priority) }}
                        >
                            {file.priority}
                        </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default FilesTable;
