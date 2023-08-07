import React from 'react';
import './Parts.scss';
import PartsTable from '../../components/Table/PartsTable';
import useFetch from '../../Hooks/useFetch';
import useSearch from '../../Hooks/useSearch';
import usePagination from '../../Hooks/usePagination';

function Parts() {
    const PARTS_URL = `http://localhost:3001/data/parts`;

    const { filteredData, dispatch, loading, error } = useFetch(PARTS_URL);

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
                `http://localhost:3001/data/parts/${clientId}`,
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
            <PartsTable
                error={error}
                loading={loading}
                handleDelete={handleDelete}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                newData={currentData}
                handleSearchChange={handleSearchChange}
                searchInput={searchInput}
            />
        </>
    );
}
export default Parts;
