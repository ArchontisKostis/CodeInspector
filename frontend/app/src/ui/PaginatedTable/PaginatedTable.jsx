import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import './PaginatedTable.css';

const PaginatedTable = (props) => {
    const { data, columns, itemsPerPage: initialItemsPerPage, exportFileName } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
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
                <div className="items-per-page-container">
                    <label htmlFor="itemsPerPage">Items per page:</label>

                    <div className="select-dropdown">
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="items-per-page-dropdown"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                <table>
                    {/* Table header */}
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                    </thead>
                    {/* Table body */}
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

                {/* Pagination */}
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

                {/* Export to CSV button */}
                <button className="export-to-csv-btn" onClick={exportToCSV}>
                    <i className="bi bi-filetype-csv"></i>
                    <p>Export to CSV</p>
                </button>
            </div>
        </>
    );
};

export default PaginatedTable;
