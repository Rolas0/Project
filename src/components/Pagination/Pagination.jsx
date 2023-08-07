import React from 'react';
import './Pagination.scss';

function Pagination({ currentPage, totalPages, handlePageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                disabled={currentPage === 1}
                page
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`pagination-button-numbers ${
                        page === currentPage ? 'pagination-button-active' : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
