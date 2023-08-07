import React from 'react';
import './ClientCard.scss';
import Pagination from '../../Pagination/Pagination';

function ClientCard({
    loading,
    error,
    data,
    handlePageChange,
    currentPage,
    totalPages,
}) {
    function totalPrice(repair) {
        const repairCost = repair.serviceId.price;

        const partsCost = repair.partsUsed.reduce((acc, part) => {
            return acc + part.price;
        }, 0);

        return repairCost + partsCost;
    }

    return (
        <>
            <div className="client-repairs-div">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : (
                    data.map((repair, index) => {
                        return (
                            <div key={index} className="repair-card">
                                <h4>
                                    Service : {repair.serviceId.name}{' '}
                                    {repair.serviceId.price} EUR
                                </h4>

                                <p className="description">
                                    Description: {repair.description}
                                </p>
                                <div>
                                    Parts Used:
                                    <ul>
                                        {repair.partsUsed.map((part, index) => (
                                            <li key={index}>
                                                {part.name} {part.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="cost">
                                    Total Cost: {totalPrice(repair)} EUR
                                </p>
                            </div>
                        );
                    })
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default ClientCard;
