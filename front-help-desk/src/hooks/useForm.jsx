import {useCallback, useState} from "react";

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState)
    const onChange = e => {
        const {value, name} = e.target
        setForm(prevForm => ({...prevForm, [name]: value}))
    }
    const binder = {}
    Object.keys(initialState).forEach((key) => {
        binder[key] = {
            onChange,
            value: form[key],
            name: key
        }
    })
    const clearForm = useCallback(() => {
        setForm(initialState)
    }, [])
    return {
        binder,
        clearForm,
        values: form,
        setForm
    }
};

export default useForm;
