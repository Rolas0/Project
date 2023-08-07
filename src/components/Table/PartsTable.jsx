import React from 'react';

import './Table.scss';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

import Pagination from '../Pagination/Pagination';
import Search from '../Form/Search';

function PartsTable({
    newData,
    handleSearchChange,
    searchInput,
    totalPages,
    currentPage,
    handlePageChange,
    handleDelete,
    loading,
    error,
}) {
    return (
        <>
            <div className="table-header">
                <h2>Parts</h2>
                <Search
                    handleSearchChange={handleSearchChange}
                    searchInput={searchInput}
                />
                <Link to="/newParts">
                    <Button text={'Add Part'} />
                </Link>
            </div>

            <div className="table-container">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newData.map((row, index) => {
                                    return (
                                        <tr className="body-tr" key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.price}- EUR</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        handleDelete(row._id)
                                                    }
                                                    text={'Delete'}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    );
}

export default PartsTable;
