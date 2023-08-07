import React, { useContext } from 'react';
import './newClient.scss';
import { useFormValidate } from '../../Hooks/useValidate';
import Button from '../../components/Buttons/Button';
import { DataContext } from '../../context/Context';

function NewClient() {
    const { dataFetch } = useContext(DataContext);
    const { dispatch } = dataFetch;

    const addClient = 'http://localhost:3001/data/clients';

    const initialState = {
        name: '',
        carModel: '',
        client_email: '',
        error: {},
    };

    function validate(values) {
        let errors = {};

        if (values.name.length < 2) {
            errors.name = 'Name must have at least 2 characters';
        } else if (values.name.length > 10) {
            errors.name = 'Name cannot be more than 10 characters';
        }

        if (values.carModel.length < 2) {
            errors.carModel = 'Car model must have at least 2 characters';
        } else if (values.carModel.length > 30) {
            errors.carModel = 'Name cannot be more than 30 characters';
        }

        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.client_email
            )
        ) {
            errors.client_email = 'Email is incorrect';
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
                const newClient = await response.json();
                dispatch({ type: 'ADD_STATE', payload: newClient });
                console.log('Client added:', newClient);
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
                <h2>Add Client</h2>
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
                        type="email"
                        name="client_email"
                        id="email"
                        value={state.client_email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    {errors.client_email && (
                        <p className="error">{errors.client_email}</p>
                    )}
                </div>

                <div className="input-div">
                    <input
                        type="text"
                        name="carModel"
                        id="carModel"
                        value={state.carModel}
                        placeholder="Car Model"
                        onChange={handleChange}
                    />
                </div>

                <Button
                    type="button"
                    onClick={onSubmit}
                    style={'button-form'}
                    text="Submit"
                />
            </form>
        </div>
    );
}
export default NewClient;
