import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, Container } from '@material-ui/core';
import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import FileInput from '../Form/FileInput';
import Spinner from '../Spinner/Spinner';
import BackDrop from '../BackDrop/Backdrop';
import './FilterAppealForm.css';
import AppealList from '../AppealList/AppealList';


const FilterAppealForm = () => {
    const { RangePicker } = DatePicker;
    const user = useSelector(state => state.users.user)

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        status: "",
        rangePickerData: [moment().format('DD/MM/YYYY'), moment().format('DD/MM/YYYY')],
        searchData: "",
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
        // console.log(dateStrings)
        setState(prevState => {
            return {
                ...prevState,
                rangePickerData: [dateStrings[0], dateStrings[1]],
            }
        })
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
                <div className="block-appeal">
                    <form autoComplete="off" onSubmit={submitFormHandler}
                        className="block-form-appeal">
                        <div className="block-inputs-appeal">
                            <label htmlFor="status">По статусу</label>
                            <Input
                                className="elementMarginBottom-appeal input-width-appeal"
                                type="text"
                                id="status"
                                value={state.status}
                                onChange={inputChangeHandler}
                                name="status"
                                allowClear
                            />
                            <label htmlFor="rangePickerData">По дате регистрации</label>
                            <div className="block-Date-appeal">
                                <RangePicker
                                    format={'DD/MM/YYYY'}
                                    className="elementMarginBottom-appeal"
                                    id="rangePickerData"
                                    value={[moment(state.rangePickerData[0], 'DD/MM/YYYY'), moment(state.rangePickerData[1], 'DD/MM/YYYY')]}
                                    onChange={rangePickerChangeHandler}
                                    name="rangePickerData"
                                    allowClear={false}
                                />
                            </div>
                            <label htmlFor="searchData">Поиск</label>
                            <Input
                                className="elementMarginBottom-appeal input-width-appeal"
                                type="text"
                                id="searchData"
                                value={state.searchData}
                                onChange={inputChangeHandler}
                                name="searchData"
                                allowClear
                            />
                        </div>
                        <div className="block-Btn-appeal">
                            <Button variant="contained" style={{ width: '120px' }} type="submit" color="primary">Потвердить</Button>
                        </div>
                    </form>
                    <div className="block-result-appeal">
                        <div className="block-title-appeal">
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

export default FilterAppealForm;