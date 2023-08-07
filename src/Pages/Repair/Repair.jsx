import React, { useContext } from 'react';
import './Repair.scss';

import { Link, useParams } from 'react-router-dom';

import ClientCard from '../../components/Cards/ClientCard/ClientCard';
import useFetch from '../../Hooks/useFetch';
import Button from '../../components/Buttons/Button';
import usePagination from '../../Hooks/usePagination';

function Repair() {
    const { clientId } = useParams();
    const REPAIRS_URL = `http://localhost:3001/data/repairs/${clientId}`;

    const { data, loading, error } = useFetch(REPAIRS_URL);

    function handlePageChange(pageNumber) {
        jump(pageNumber);
    }

    const itemsPerPage = 8;
    const { currentData, currentPage, totalPages, jump } = usePagination(
        data,
        itemsPerPage
    );

    return (
        <>
            <div className="repair-div">
                <div className="btn-add-repair-div">
                    <h2> Client id:{clientId}</h2>
                    <Link to={`/newRepair/${clientId}`}>
                        <Button text="Add Repairs" />
                    </Link>
                </div>
                <ClientCard
                    loading={loading}
                    error={error}
                    data={currentData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </>
    );
}
export default Repair;
