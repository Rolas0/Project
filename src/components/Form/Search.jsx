import './Search.scss';

function Search({ handleSearchChange, searchInput }) {
    return (
        <form className="search-form" action="">
            <input
                onChange={handleSearchChange}
                value={searchInput}
                id="search"
                type="search"
                name="search"
            />
        </form>
    );
}
export default Search;
