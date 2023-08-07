import React, { useReducer } from 'react';
function formReducer(prevState, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...prevState,
                [action.name]: action.value,
                error: { ...prevState.error, [action.name]: undefined },
            };
        case 'RESET':
            return action.initialState;

        case 'ADDED_CLIENT':
            return { ...prevState, data: [...prevState.data, action.payload] };
        case 'ERROR':
            return { ...prevState, error: action.errors };
        default:
            return prevState;
    }
}

export function useFormValidate(initialValues, validate, handleSubmit) {
    const [state, dispatch] = useReducer(formReducer, initialValues);

    function reset() {
        dispatch({ type: 'RESET', initialState: initialValues });

        dispatch({ type: 'ERROR', errors: {} });
    }
    function onSubmit(event) {
        const validationErrors = validate(state);

        dispatch({ type: 'ERROR', errors: validationErrors });
        if (Object.keys(validationErrors).length === 0) {
            handleSubmit(state);
            reset();
        }
    }
    function handleChange(event) {
        const { name, value } = event.target;
        dispatch({ type: 'CHANGE', name, value });
    }
    return { state, errors: state.error, handleChange, dispatch, onSubmit };
}
