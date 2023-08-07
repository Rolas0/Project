import React, { useContext } from 'react';
import './NewRepair.scss';
import { useParams } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import { useFormValidate } from '../../Hooks/useValidate';
import { DataContext } from '../../context/Context';
import Options from '../../components/Form/Options';

function NewRepair() {
    const { partsFetch, serviceFetch } = useContext(DataContext);
    const { data } = partsFetch;

    const { data: serviceData } = serviceFetch;

    const addRepair = 'http://localhost:3001/data/repairs';
    const { id } = useParams();

    const initialState = {
        clientId: id,
        serviceId: '',
        description: '',
        partsUsed: [],
        cost: 0,
        error: {},
    };

    function validate(values) {
        let errors = {};

        if (!values.serviceId) {
            errors.serviceId = 'Please select a service';
        }

        if (!values.partsUsed || values.partsUsed.length === 0) {
            errors.partsUsed = 'Please select at least one part';
        }

        return errors;
    }

    async function handleSubmit(values) {
        try {
            const { error, ...data } = values;
            const response = await fetch(addRepair, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Repair added:', data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const { state, errors, handleChange, onSubmit } = useFormValidate(
        initialState,
        validate,
        handleSubmit
    );

    return (
        <div className="form-container">
            <div>
                {' '}
                <h2>Add Repair</h2>
            </div>
            <form className="add-form">
                <div className="input-div">
                    <Options
                        name="serviceId"
                        id="serviceId"
                        value={state.serviceId}
                        data={serviceData}
                        text="Select a Service"
                        handleChange={handleChange}
                    />
                    {errors.serviceId && (
                        <p className="error">{errors.serviceId}</p>
                    )}
                </div>

                <div className="input-div">
                    <Options
                        name="partsUsed"
                        id="partsUsed"
                        value={state.data}
                        data={data}
                        text="Select Part"
                        handleChange={handleChange}
                    />
                    {errors.data && <p className="error">{errors.data}</p>}
                </div>
                <div className="input-div">
                    <textarea
                        name="description"
                        id="description"
                        value={state.description}
                        placeholder="Description"
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>

                <Button type="button" onClick={onSubmit} text="Submit" />
            </form>
        </div>
    );
}

export default NewRepair;
