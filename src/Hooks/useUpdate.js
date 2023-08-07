import { useReducer } from 'react';
// import { clientReducer, initialClientState } from '../reducer/reducer';
import { reducerFn } from './useFetch';

const initialClientState = {
    data: [],
    loading: true,
    error: null,
};
function useUpdate() {
    const [state, dispatch] = useReducer(reducerFn, initialClientState);

    async function updateData(UPDATE_URL, clientId, status) {
        try {
            dispatch({ type: 'UPDATE_LOADING' });

            const response = await fetch(UPDATE_URL + clientId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            const jsonData = await response.json();
            dispatch({ type: 'UPDATE_STATE', data: jsonData });
        } catch (error) {
            dispatch({ type: 'UPDATE_ERROR', error: error.message });
        }
    }

    return { ...state, updateData };
}

export default useUpdate;
