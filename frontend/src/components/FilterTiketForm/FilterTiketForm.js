import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, Container } from '@material-ui/core';

import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import FileInput from '../Form/FileInput';
import Spinner from '../Spinner/Spinner';
import BackDrop from '../BackDrop/Backdrop';
import AppealList from '../AppealList/AppealList';

import './FilterTiketForm.css';


const FilterTiketForm = () => {
    const { RangePicker } = DatePicker;

    const user = useSelector(state => state.users.user)

    const errors = useSelector(state => state.users.error);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        status: "",
        rangePickerData: [moment().format('DD/MM/YYYY'), moment().format('DD/MM/YYYY')],
        priority: "",
        department: "",
        coWorker: "",
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

    const rangePickerChangeHandler = (date, dateStrings) => {
        setState(prevState => {
            return {
                ...prevState,
                rangePickerData: [dateStrings[0], dateStrings[1]],
            }
        })
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

    const onFormSubmit = async (dataCopy) => {
        setLoading(true)
        // await dispatch(addNewGalleryPhoto(dataCopy));
        setTimeout(() => {
            setLoading(false);
        }, 1000)
        console.log(state)
    }

    const submitFormHandler = (event) => {
        setState({ createDatetime: new Date().toISOString() })
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        })
        onFormSubmit(formData);
    }

    return (
        <>
            {loading && <>
                <BackDrop show={loading} />
                <Spinner />
            </>
            }
            <Container maxWidth="md" component="main">
                <div className="block-tiket">
                    <form autoComplete="off" className="block-form-tiket" noValidate onSubmit={submitFormHandler}>
                        <div className="block-inputs-tiket">
                            <div className="inputs-tiket--left">
                                <label htmlFor="status">По статусу</label>
                                <Input
                                    className="elementMarginBottom-tiket input-width-tiket"
                                    type="text"
                                    id="status"
                                    value={state.status}
                                    onChange={inputChangeHandler}
                                    name="status"
                                    allowClear
                                />
                                <label htmlFor="rangePickerData">По дате регистрации</label>
                                <div className="block-Date-tiket">
                                    <RangePicker
                                        format={'DD/MM/YYYY'}
                                        className="elementMarginBottom-tiket"
                                        id="rangePickerData"
                                        value={[moment(state.rangePickerData[0], 'DD/MM/YYYY'), moment(state.rangePickerData[1], 'DD/MM/YYYY')]}
                                        onChange={rangePickerChangeHandler}
                                        name="rangePickerData"
                                        allowClear={false}
                                    />
                                </div>
                                <label htmlFor="priority">По приоритету</label>
                                <Input
                                    className="elementMarginBottom-tiket input-width-tiket"
                                    type="text"
                                    id="priority"
                                    value={state.priority}
                                    onChange={inputChangeHandler}
                                    name="priority"
                                    allowClear
                                />
                            </div>
                            <div className="inputs-tiket--center">
                                <label htmlFor="department">По отделу</label>
                                <Input
                                    className="elementMarginBottom-tiket input-width-tiket"
                                    type="text"
                                    id="department"
                                    value={state.department}
                                    onChange={inputChangeHandler}
                                    name="department"
                                    allowClear
                                />
                                <label htmlFor="coWorker">По сотруднику</label>
                                <Input
                                    className="elementMarginBottom-tiket input-width-tiket"
                                    type="text"
                                    id="coWorker"
                                    value={state.coWorker}
                                    onChange={inputChangeHandler}
                                    name="coWorker"
                                    allowClear
                                />
                            </div>
                        </div>
                        <div className="block-Btn-tiket">
                            <Button variant="contained" style={{ width: '120px' }} type="submit" color="primary">Потвердить</Button>
                        </div>
                    </form>
                    <div className="block-result-tiket">
                        <div className="block-title-tiket">
                            <p>№</p>
                            <p>Статус</p>
                            <p>Название</p>
                            <p>Краткое описание</p>
                            <p>Комментарии</p>
                        </div>
                        <AppealList />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default FilterTiketForm;