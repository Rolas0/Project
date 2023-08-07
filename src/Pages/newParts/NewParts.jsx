import React from 'react';
import './NewParts.scss';
import { useFormValidate } from '../../Hooks/useValidate';
import Button from '../../components/Buttons/Button';

function NewParts() {
    const addClient = 'http://localhost:3001/data/parts';

    const initialState = {
        name: '',
        price: '',
        error: {},
    };

    function validate(values) {
        let errors = {};

        if (values.name.length < 2) {
            errors.name = 'Name must have at least 2 characters';
        }

        return errors;
    }

    async function handleSubmit(values) {
        try {
            const { error, ...data } = values;
            const response = await fetch(addClient, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const newPart = await response.json();
                dispatch({ type: 'ADDED_CLIENT', payload: newPart });

                console.log('part added:', data);
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
                <h2>Add Part</h2>
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
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={state.price}
                        placeholder="Price"
                        onChange={handleChange}
                    />
                </div>

                <Button
                    type="button"
                    style={'btn'}
                    onClick={onSubmit}
                    text="Submit"
                />
            </form>
        </div>
    );
}
export default NewParts;
