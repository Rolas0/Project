import React, { useEffect, useReducer } from 'react';

export function reducerFn(state, action) {
    switch (action.type) {
        case 'FETCH_STATE':
            return {
                ...state,
                data: action.payload,
                filteredData: action.payload,
                loading: false,
                error: null,
            };

        case 'FETCH_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'ADD_STATE':
            return {
                ...state,
                data: [...state.data, action.payload],
                filteredData: [...state.data, action.payload],
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload,
            };
        case 'DELETE_STATE':
            const filteredData = state.data.filter(
                (row) => row._id !== action.payload
            );
            return { ...state, data: filteredData, filteredData: filteredData };
        case 'UPDATE_LOADING':
            return { ...state, updating: true };
        case 'UPDATE_STATE':
            const updatedData = state.data.map((row) =>
                row._id === action.clientId ? { ...row, status: true } : row
            );
            return { ...state, data: updatedData, updating: false };
        case 'UPDATE_ERROR':
            return { ...state, updating: false, error: action.error };
        default:
            return state;
    }
}

function useFetch(url, initialData = []) {
    const initialState = {
        data: initialData,
        loading: true,
        error: null,
        filteredData: initialData,
    };

    const [state, dispatch] = useReducer(reducerFn, initialState);

    useEffect(() => {
        async function fetchData() {
            dispatch({ type: 'FETCH_LOADING' });
            try {
                const response = await fetch(url);
                const data = await response.json();
                dispatch({ type: 'FETCH_STATE', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        }

        fetchData();
    }, [url]);

    return { ...state, dispatch };
}

export default useFetch;
