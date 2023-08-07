import React from 'react';

import './newServices.scss';
import { useFormValidate } from '../../Hooks/useValidate';

import Button from '../../components/Buttons/Button';

function NewServices() {
    const addService = 'http://localhost:3001/data/services';

    const initialState = {
        name: '',
        description: '',
        price: '',
        error: {},
    };

    function validate(values) {
        let errors = {};

        if (values.name.length < 2) {
            errors.name = 'Name must have at least 2 characters';
        } else if (values.name.length > 25) {
            errors.name = 'Name cannot be more than 25 characters';
        }

        if (values.description.length < 2) {
            errors.description = 'Description  must have at least 2 characters';
        }

        if (values.price === 0) {
            errors.price = 'Please enter the price';
        }

        return errors;
    }

    async function handleSubmit(values) {
        try {
            const { error, ...data } = values;
            const response = await fetch(addService, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const newItem = response.json();
                dispatch({ type: 'ADDED_CLIENT', payload: newItem });
                console.log('Service added:', data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const { state, errors, dispatch, handleChange, onSubmit } = useFormValidate(
        initialState,
        validate,
        handleSubmit
    );

    return (
        <div className="form-container">
            <div>
                {' '}
                <h2>Add Service</h2>
            </div>
            <form className="add-form">
                <div className="input-div">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={state.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />

                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="input-div">
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={state.description}
                        placeholder="description"
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>
                <div className="input-div">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={state.price}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <Button type="button" onClick={onSubmit} text="Submit" />
            </form>
        </div>
    );
}
export default NewServices;
