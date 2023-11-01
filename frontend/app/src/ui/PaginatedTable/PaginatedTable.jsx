import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import './PaginatedTable.css';

const PaginatedTable = (props) => {
    const { data, columns, itemsPerPage: initialItemsPerPage, exportFilename, searchColumn, type } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState(''); // Track the sorting column
    const [sortOrder, setSortOrder] = useState('asc'); // Track the sorting order

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Function to format a date string
    const formatDateString = (dateString) => {
        // Regular expression to match the desired format
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

        if (dateFormatRegex.test(dateString)) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            dateString = new Date(dateString).toLocaleDateString(undefined, options);
        }

        return dateString;
    };

    // Function to format a commit hash
    const formatHashString = (hashString) => {
        if (hashString.length === '-') {
           return hashString;
        }

        return (
            <>
                <a href="">
                    {hashString}
                </a>
            </>
        )
    }

    // Filter the data based on the search query
    const filteredData = data.filter((item) => {
        if (searchQuery === '') {
            return true;
        } else {
            const value = item[searchColumn];
            return value && value.toLowerCase().includes(searchQuery.toLowerCase());
        }
    });

    // Sort the data based on the selected column and order
    const sortedData = [...filteredData];
    if (sortColumn) {
        sortedData.sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (type === 'files') {
                if (sortColumn === 'metrics.CC') return sortOrder === 'asc' ? a.metrics.CC- b.metrics.CC : b.metrics.CC - a.metrics.CC;

                else if (sortColumn === 'metrics.CHURN') return sortOrder === 'asc' ? a.metrics.CHURN - b.metrics.CHURN : b.metrics.CHURN - a.metrics.CHURN;

                else if (sortColumn === 'metrics.NLOC') return sortOrder === 'asc' ? a.metrics.NLOC - b.metrics.NLOC : b.metrics.NLOC - a.metrics.NLOC;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            else if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            else return 0;
        });
    }

    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        const selectedColumn = event.target.value;
        setSortColumn(selectedColumn);

        // Toggle sorting order if the same column is clicked again
        if (selectedColumn === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOrder('asc');
        }
    };

    const resetSearch = () => {
        setSearchQuery('');
    };

    const exportToCSV = () => {
        const csvRows = [];
        const headers = columns.map((column) => column.label);
        csvRows.push(headers.join(','));
        filteredData.forEach((item) => {
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
        const filename = exportFilename ? exportFilename : 'code-inspector-export.csv';
        saveAs(csvBlob, filename);
    };

    return (
        <>
            <div className="paginated-table">
                <div className="table-settings-container">

                    <div className='dropdowns'>
                        <div className='select-container-table'>
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

                        <div className="sort-container">
                                <label htmlFor="sort">Sort by:</label>

                                <div className="select-dropdown">
                                    <select
                                        id="sort"
                                        value={sortColumn}
                                        onChange={handleSortChange}
                                        className="sort-dropdown"
                                    >
                                        <option value="">None</option>
                                        {columns.map((column) => (
                                            <option key={column.key} value={column.key}>
                                                {column.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                    </div>



                    {/* Search input field */}
                    <div className="search-container">
                        <label className='search-label' htmlFor="search">
                            <i className='bi bi-search'></i>
                        </label>

                        <input
                            type="text"
                            id="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />

                        <button className='search-btn' onClick={resetSearch}>
                            <i className='bi bi-x-circle'></i>
                        </button>
                    </div>
                </div>

                <table>
                    {/* Table header */}
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                                {sortColumn === column.key && (
                                    <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                                )}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column, index) => (
                                <td key={column.key}>
                                    {column.nested ? (
                                        column.key
                                            .split('.')
                                            .reduce((obj, key) => obj?.[key], item)
                                    ) : (
                                        (type === 'commits' && index === 0) ? (
                                            <a href={props.commitsUrl + '/' + item[column.key]}>
                                                {item[column.key]}
                                            </a>
                                        ) : (
                                            formatDateString(item[column.key] || '-')
                                        )
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
