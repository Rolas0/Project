import useFetch from './useFetch';

export const useDataFetch = () => {
    const DATA_URL = `http://localhost:3001/data`;
    return useFetch(DATA_URL);
};

export const useServiceFetch = () => {
    const SERVICE_URL = `http://localhost:3001/data/services`;
    return useFetch(SERVICE_URL);
};

export const usePartsFetch = () => {
    const PARTS_URL = `http://localhost:3001/data/parts`;
    return useFetch(PARTS_URL);
};
