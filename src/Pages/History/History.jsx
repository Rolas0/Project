import './History.scss';
import HistoryTable from '../../components/Table/HistoryTable';
import useSearch from '../../Hooks/useSearch';
import { useContext } from 'react';
import { DataContext } from '../../context/Context';
import usePagination from '../../Hooks/usePagination';
import useFetch from '../../Hooks/useFetch';
function History() {
    // const { dataFetch } = useContext(DataContext);
    // const { data, loading, error, dispatch } = dataFetch;

    const HISTORY_URL = `http://localhost:3001/data/history`;

    const { data, dispatch, loading, error } = useFetch(HISTORY_URL);

    const { searchData, searchInput, handleSearchChange } = useSearch(data);

    function handlePageChange(pageNumber) {
        jump(pageNumber);
    }

    const itemsPerPage = 8;
    const { currentData, currentPage, totalPages, jump } = usePagination(
        searchData,
        itemsPerPage
    );
    return (
        <>
            <HistoryTable
                dispatch={dispatch}
                error={error}
                loading={loading}
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
export default History;
