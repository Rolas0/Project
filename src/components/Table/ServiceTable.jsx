import React from 'react';
import './ServiceTable.scss';
// import { useContext } from 'react';
// import { DataContext } from '../../context/Context';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';
import Search from '../Form/Search';
import Pagination from '../Pagination/Pagination';

function ServiceTable({
    newData,
    searchInput,
    handleSearchChange,
    handlePageChange,
    currentPage,
    totalPages,
    handleDelete,
    error,
    loading,
}) {
    // const { serviceFetch } = useContext(DataContext);
    // const { filteredData, dispatch } = serviceFetch;

    return (
        <>
            <div className="table-header">
                <h2>Services</h2>
                <Search
                    handleSearchChange={handleSearchChange}
                    searchInput={searchInput}
                />
                <Link to="/newServices">
                    {' '}
                    <Button text={'Add Service'} />{' '}
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
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newData.map((row, index) => {
                                    return (
                                        <tr className="body-tr" key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.description}</td>
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

export default ServiceTable;
