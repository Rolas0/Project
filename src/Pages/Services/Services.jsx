import React, { useContext } from 'react';

import './Services.scss';
import ServiceTable from '../../components/Table/ServiceTable';

import useFetch from '../../Hooks/useFetch';
import usePagination from '../../Hooks/usePagination';
import useSearch from '../../Hooks/useSearch';

function Services() {
    const SERVICE_URL = `http://localhost:3001/data/services/`;

    const { filteredData, dispatch, loading, error } = useFetch(SERVICE_URL);

    const { searchData, searchInput, handleSearchChange } =
        useSearch(filteredData);

    function handlePageChange(pageNumber) {
        jump(pageNumber);
    }

    const itemsPerPage = 8;
    const { currentData, currentPage, totalPages, jump } = usePagination(
        searchData,
        itemsPerPage
    );

    const handleDelete = async (clientId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/data/services/${clientId}`,
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
            <ServiceTable
                loading={loading}
                error={error}
                handleDelete={handleDelete}
                newData={currentData}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    );
}
export default Services;
