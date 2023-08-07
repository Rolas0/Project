import { useState, useEffect } from 'react';

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [data, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = data.slice(start, end);

    function jump(page) {
        setCurrentPage(() => Math.min(Math.max(page, 1), totalPages));
    }

    return {
        currentData,
        currentPage,

        totalPages,
        jump,
    };
}

export default usePagination;
