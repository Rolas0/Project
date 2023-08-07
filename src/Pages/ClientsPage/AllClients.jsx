import Table from '../../components/Table/Table';
import useSearch from '../../Hooks/useSearch';
import usePagination from '../../Hooks/usePagination';
import useFetch from '../../Hooks/useFetch';

function AllClients() {
    // const { dataFetch } = useContext(DataContext);
    // const { data, loading, error, dispatch } = dataFetch;
    const CLIENTS_URL = `http://localhost:3001/data/clients`;

    const { data, dispatch, loading, error } = useFetch(CLIENTS_URL);

    const { searchData, searchInput, handleSearchChange } = useSearch(data);

    function handlePageChange(pageNumber) {
        jump(pageNumber);
    }

    const itemsPerPage = 7;
    const { currentData, currentPage, totalPages, jump } = usePagination(
        searchData,
        itemsPerPage
    );

    return (
        <>
            <Table
                loading={loading}
                error={error}
                dispatch={dispatch}
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
export default AllClients;
