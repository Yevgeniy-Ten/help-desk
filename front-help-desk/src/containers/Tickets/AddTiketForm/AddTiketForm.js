import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid, Button, Container } from '@material-ui/core';
import { Input } from 'antd';

import FileInput from '../Form/FileInput';
import Spinner from '../Spinner/Spinner';
import BackDrop from '../BackDrop/Backdrop';
import './AddTiketForm.css';

import { addNewTikets } from '../redux/action/tiketsAction';
import { getTiketsState } from '../redux/getters/getters';

const AddTiketForm = () => {
    const dispatch = useDispatch();
    const { TextArea } = Input;

    const { tiketsList } = useSelector(getTiketsState, shallowEqual);

    const user = useSelector(state => state.users.user)

    const errors = useSelector(state => state.users.error);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        // numberAppeal: "",
        // client: "",
        // serviceType: "",
        // endData: "",
        // priority: "",
        // department: "",
        // coWorker: "",
        appeal_id: "",
        user_id: "",
        type: "",
        endData: "",
        priority: "",
        department: "",
        employee: "",
    });

    const inputChangeHandler = (event, index) => {
        const { name, value } = event.target;
        console.log(name, value)
        setState(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        }
        )
    }

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => {
            return {
                ...prevState,
                [name]: file,
            }
        }
        )
    }

    const submitFormHandler = async (event) => {
        setState({ createDatetime: new Date().toISOString() })
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        })
        await dispatch(addNewTikets(formData));
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }

    return (
        <>
            {loading && <>
                <BackDrop show={loading} />
                <Spinner />
            </>
            }
            <Container maxWidth="md" component="main">
                <div className="block-tiketCreate">
                    <form autoComplete="off" className="block-form-tiketCreate" noValidate onSubmit={submitFormHandler}>
                        <div className="block-inputs-tiketCreate">
                            <div className="inputs-tiketCreate--left">
                                <label htmlFor="numberAppeal">№ обращения *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="numberAppeal"
                                    value={state.appeal_id}
                                    onChange={inputChangeHandler}
                                    name="numberAppeal"
                                    required
                                    allowClear
                                />
                                <label htmlFor="client">Клиент *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="client"
                                    value={state.user_id}
                                    onChange={inputChangeHandler}
                                    name="client"
                                    required
                                    allowClear
                                />
                                <label htmlFor="serviceType">Тип услуги *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate inputDate-margin-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="serviceType"
                                    value={state.type}
                                    onChange={inputChangeHandler}
                                    name="serviceType"
                                    allowClear
                                />
                                <label htmlFor="priority">Приоритет *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="priority"
                                    value={state.priority}
                                    onChange={inputChangeHandler}
                                    name="priority"
                                    allowClear
                                />
                                <label htmlFor="department">Ответственный отдел *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="department"
                                    value={state.department}
                                    onChange={inputChangeHandler}
                                    name="department"
                                    allowClear
                                    disabled
                                />
                                <label htmlFor="coWorker">Ответственный сотрудник *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="coWorker"
                                    value={state.employee}
                                    onChange={inputChangeHandler}
                                    name="coWorker"
                                    allowClear
                                />
                                <div className="block-Btn-tiketCreate">
                                    <Button variant="contained" style={{ width: '120px' }} type="submit" color="primary">Создать</Button>
                                </div>
                            </div>
                            <div className="inputs-tiketCreate--center">
                                <label htmlFor="serviceTitle">Тема обращения *</label>
                                <Input
                                    className="elementMarginBottom-tiketCreate input-width-tiketCreate"
                                    type="text"
                                    id="serviceTitle"
                                    value={state.serviceTitle}
                                    onChange={inputChangeHandler}
                                    name="serviceTitle"
                                    required
                                    allowClear
                                />
                                <div className="elementMarginBottom-tiketCreate description-tiketCreate">
                                    <label htmlFor="description">Полное описание</label>
                                    <TextArea
                                        // className="elementMarginBottom-tiketCreate description-tiketCreate"
                                        type="text"
                                        id="description"
                                        rows="6"
                                        value={state.description}
                                        onChange={inputChangeHandler}
                                        name="description"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default AddTiketForm;