import { useEffect, useReducer, useMemo } from 'react';

function filterData(data, searchInput) {
    const filteredResults = data.filter((item) => {
        const name = item.name || '';
        const createdAt = new Date(item.createdAt);
        const formattedDate = `${
            createdAt.getMonth() + 1
        }/${createdAt.getDate()}/${createdAt.getFullYear()}`;

        const formatSearchInput = searchInput.toLowerCase().trim().split(' ');

        return formatSearchInput.every((input) => {
            return (
                name.toLowerCase().includes(input) ||
                formattedDate.includes(input)
            );
        });
    });

    return filteredResults;
}

function searchReducer(prevState, action) {
    switch (action.type) {
        case 'SET_SEARCH_INPUT':
            return {
                ...prevState,
                searchInput: action.payload,
                filteredData: filterData(prevState.initialData, action.payload),
            };

        case 'INITIAL_DATA_CHANGE':
            return {
                ...prevState,
                initialData: action.payload,
                filteredData: action.payload,
            };
        case 'SET_FILTERED_SEARCH_DATA':
            return {
                ...prevState,
                filteredData: action.payload,
            };

        default:
            return prevState;
    }
}

function useSearch(data) {
    const initialState = {
        searchInput: '',
        filteredData: data,
        initialData: data,
    };

    const [state, dispatch] = useReducer(searchReducer, initialState);

    const filteredData = useMemo(() => {
        return filterData(state.initialData, state.searchInput);
    }, [state.initialData, state.searchInput]);

    useEffect(() => {
        dispatch({ type: 'INITIAL_DATA_CHANGE', payload: data });
        console.log('changes');
    }, [data]);

    function handleSearchChange(event) {
        // console.log('Test');
        const searchInput = event?.target.value || '';

        dispatch({ type: 'SET_SEARCH_INPUT', payload: searchInput });
    }

    return {
        searchInput: state.searchInput,
        searchData: filteredData,
        handleSearchChange,
    };
}

export default useSearch;
