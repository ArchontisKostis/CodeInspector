import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import './PaginatedTable.css';

const PaginatedTable = (props) => {
    const { data, columns, itemsPerPage, exportFileName } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToCSV = () => {
        const csvRows = [];
        const headers = columns.map((column) => column.label);

        csvRows.push(headers.join(','));

        currentItems.forEach((item) => {
            const rowData = columns.map((column) => {
                if (column.nested) {
                    const nestedKeys = column.key.split('.');
                    let value = item;
                    nestedKeys.forEach((nestedKey) => {
                        value = value[nestedKey];
                    });
                    return value;
                } else {
                    return item[column.key];
                }
            });
            csvRows.push(rowData.join(','));
        });

        const csvContent = csvRows.join('\n');
        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

        saveAs(csvBlob, exportFileName);
    };

    return (
        <>
            <div className="paginated-table">
                <table>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.nested ? (
                                        column.key
                                            .split('.')
                                            .reduce((obj, key) => obj?.[key], item)
                                    ) : (
                                        item[column.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button className="export-to-csv-btn" onClick={exportToCSV}>
                    <i className="bi bi-filetype-csv"></i>
                    <p>Export to CSV</p>
                </button>
            </div>

        </>
    );
};

export default PaginatedTable;
