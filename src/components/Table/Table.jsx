import React, { useContext } from 'react';
import './Table.scss';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';
import useUpdate from '../../Hooks/useUpdate';
import Search from '../Form/Search';
import Pagination from '../Pagination/Pagination';

function Table({
    newData,
    searchInput,
    handleSearchChange,
    handlePageChange,
    currentPage,
    totalPages,
    dispatch,
    loading,
    error,
}) {
    const UPDATE_URL = 'http://localhost:3001/data/';

    const { updateData } = useUpdate();

    const handleStatus = async (clientId) => {
        try {
            await updateData(UPDATE_URL, clientId, true);

            dispatch({ type: 'UPDATE_STATE', clientId: clientId });
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case false:
                return 'Active';
            case true:
                return 'Completed';
            default:
                return 'Active';
        }
    };

    return (
        <>
            <div className="table-header">
                <h2>Clients</h2>

                <Search
                    handleSearchChange={handleSearchChange}
                    searchInput={searchInput}
                />

                <Link to="/newClient">
                    {' '}
                    <Button text={'Add Client'} />{' '}
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
                                    <th>Email</th>
                                    <th>Car Model</th>
                                    <th>Created At</th>
                                    <th>Repair Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newData
                                    .filter((row) => row.status === false)
                                    .map((row) => {
                                        const formattedDate = new Date(
                                            row.createdAt
                                        ).toLocaleDateString();
                                        return (
                                            <tr
                                                className="body-tr"
                                                key={row._id}
                                            >
                                                <td>{row.name}</td>
                                                <td>{row.client_email}</td>
                                                <td>{row.carModel}</td>
                                                <td>{formattedDate}</td>
                                                <td className="status">
                                                    <p className="td-p">
                                                        {getStatusLabel(
                                                            row.status
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="actions">
                                                    <Button
                                                        className="complete-btn"
                                                        onClick={() =>
                                                            handleStatus(
                                                                row._id
                                                            )
                                                        }
                                                        text={'Complete'}
                                                        disabled={loading}
                                                    />

                                                    <Link
                                                        className="info-btn"
                                                        to={`/repair/${row._id}`}
                                                    >
                                                        Info
                                                    </Link>
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

export default Table;
