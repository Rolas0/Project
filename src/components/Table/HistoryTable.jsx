import React from 'react';
import './HistoryTable.scss';
import { Link } from 'react-router-dom';

import Button from '../Buttons/Button';

import Search from '../Form/Search';
import Pagination from '../Pagination/Pagination';

function HistoryTable({
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
    const handleDelete = async (clientId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/data/${clientId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                dispatch({ type: 'DELETE_STATE', payload: clientId });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="table-header">
                <h2>History</h2>

                <Search
                    handleSearchChange={handleSearchChange}
                    searchInput={searchInput}
                />
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
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newData
                                    .filter((row) => row.status === true)
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
                                                <td>Completed</td>
                                                <td className="actions">
                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(
                                                                row._id
                                                            )
                                                        }
                                                        text={'Delete'}
                                                    />
                                                    <Link
                                                        className="action-btn"
                                                        to={`/repair/${row._id}`}
                                                    >
                                                        <Button text={'Info'} />
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

export default HistoryTable;

// function HistoryTable() {
//     const { state, dispatch } = useContext(DataContext);
//     const { clients, services, parts, loading, error } = state;

//     const handleDelete = async (clientId) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3001/data/${clientId}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.ok) {
//                 dispatch({ type: 'DELETE_CLIENT', payload: clientId });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     if (loading) {
//         console.log('Loading:', loading);
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <>
//             <div className="table-header">
//                 <h2>History</h2>
//             </div>

//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div className="table-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Id</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Car Model</th>
//                                 <th>Created At</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {clients
//                                 .filter((row) => row.status === true)
//                                 .map((row) => {
//                                     return (
//                                         <tr key={row._id}>
//                                             <td>{row._id}</td>
//                                             <td>{row.name}</td>
//                                             <td>{row.client_email}</td>
//                                             <td>{row.carModel}</td>
//                                             <td>{row.createdAt}</td>
//                                             <td>Completed</td>
//                                             <td>
//                                                 <Button
//                                                     onClick={() =>
//                                                         handleDelete(row._id)
//                                                     }
//                                                     text={'Delete Client'}
//                                                 />
//                                                 <Link
//                                                     className="action-btn"
//                                                     to={`/repair/${row._id}`}
//                                                 >
//                                                     <Button text={'Info'} />
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </>
//     );
// }

// export default HistoryTable;
