import React, { createContext } from 'react';

import {
    useDataFetch,
    usePartsFetch,
    useServiceFetch,
} from '../Hooks/endpoints';

export const DataContext = createContext();

function DataProvider({ children }) {
    const dataFetch = useDataFetch();
    const serviceFetch = useServiceFetch();
    const partsFetch = usePartsFetch();

    return (
        <DataContext.Provider
            value={{
                dataFetch,
                serviceFetch,
                partsFetch,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
export default DataProvider;
