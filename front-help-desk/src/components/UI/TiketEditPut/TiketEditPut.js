import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, Container } from '@material-ui/core';

import { Input } from 'antd';
import { DatePicker, TimePicker, } from 'antd';
import moment from 'moment';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FileInput from '../Form/FileInput';
import Spinner from '../Spinner/Spinner';
import BackDrop from '../BackDrop/Backdrop';

import './TiketEditPut.css';


const TiketEditPut = () => {
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const user = useSelector(state => state.users.user)

    const errors = useSelector(state => state.users.error);
    const [loading, setLoading] = useState(false);
    const [tiketEditPut, setTiketEditPut] = useState(false);

    const [state, setState] = useState({
        status: "Открыт",
        serviceType: "Обслуживание",
        priority: "Normal",
        department: "Отдел обслуживания",
        coWorker: "Борщев А. М.",
        laborCosts: "3 часа",
        serviceTitle: "Устранить тех. неполадки с доменом",
        description: "У клиента не работает домен. Проверить сервер.",
        rangePickerData: moment().format("05/03/2021", 'DD/MM/YYYY'),
        timeHm: moment("18:00", "HH:mm")
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
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
                rangePickerData: [dateStrings[0]],
            }
        })
    }

    const timePickerChangeHandler = (time, timeString) => {
        setState(prevState => {
            return {
                ...prevState,
                timeHm: timeString,
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

    const tiketEditOpenHandler = () => {
        if (tiketEditPut) {
            return setTiketEditPut(false);
        }
        return setTiketEditPut(true);
    }
    return (
        <>
            {loading && <>
                <BackDrop show={loading} />
                <Spinner />
            </>
            }
            <Container maxWidth="md" component="main">
                <div className="block-tiketEditPut">
                    <div className="block-text-tiketEditPut">
                        <div className="text-tiketEditPut--left">
                            <p className="text-tiketEditPut">-№ тикета: 000001</p>
                            <p className="text-tiketEditPut">-Приоритет: Normal</p>
                            <p className="text-tiketEditPut">-Статус: Открыт</p>
                            <p className="text-tiketEditPut">-Назначено на отдел: Отдел обслуживания</p>
                            <p className="text-tiketEditPut">-Назначено на сотрудника: Борщев А.М.</p>
                            <p className="text-tiketEditPut">-Тип услуги: Обслуживание</p>
                            <p className="text-tiketEditPut">-Тип: Инцедент</p>
                            <p className="text-tiketEditPut">-Дата создания: 01.03.2021</p>
                            <p className="text-tiketEditPut">-Сроки (включительно): 05.03.2021 18:00</p>
                            <p className="text-tiketEditPut">-Трудозатраты: 3 часа</p>
                        </div>
                        <div className="text-tiketEditPut--center">
                            <p className="text-tiketEditPut">-Краткое описание: Устранить тех. неполадки с доменом</p>
                            <p className="text-tiketEditPut">-Полное описание: </p>
                            <p className="text-tiketEditPut"> У клиента не работает домен. Проверить сервер.</p>
                        </div>
                    </div>
                    <div className="open-Btn-tiketEditPut">
                        <Button variant="contained" style={{ width: '120px' }}
                            onClick={tiketEditOpenHandler} color="primary">
                            <ArrowDropDownIcon />
                        </Button>
                    </div>
                    {tiketEditPut ?
                        <form autoComplete="off" className="block-form-tiketEditPut" noValidate onSubmit={submitFormHandler}>
                            <div className="block-inputs-tiketEditPut">
                                <div className="inputs-tiketEditPut--left">
                                    <label htmlFor="status">Статус *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="status"
                                        value={state.status}
                                        onChange={inputChangeHandler}
                                        name="status"
                                        required
                                        allowClear
                                    />
                                    <label htmlFor="serviceType">Тип услуги *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut inputDate-margin-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="serviceType"
                                        value={state.serviceType}
                                        onChange={inputChangeHandler}
                                        name="serviceType"
                                        allowClear
                                    />
                                    <label htmlFor="priority">Приоритет *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="priority"
                                        value={state.priority}
                                        onChange={inputChangeHandler}
                                        name="priority"
                                        allowClear
                                    />
                                    <label htmlFor="department">Ответственный отдел *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="department"
                                        value={state.department}
                                        onChange={inputChangeHandler}
                                        name="department"
                                        allowClear
                                    />
                                    <label htmlFor="coWorker">Ответственный сотрудник *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="coWorker"
                                        value={state.coWorker}
                                        onChange={inputChangeHandler}
                                        name="coWorker"
                                        allowClear
                                    />
                                    <label htmlFor="laborCosts">Трудозатраты *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        type="text"
                                        id="laborCosts"
                                        value={state.laborCosts}
                                        onChange={inputChangeHandler}
                                        name="laborCosts"
                                        required
                                        allowClear
                                    />
                                    <div className="block-Btn-tiketEditPut">
                                        <Button variant="contained" style={{ width: '120px' }} type="submit" color="primary">Создать</Button>
                                    </div>
                                </div>
                                <div className="inputs-tiketEditPut--center">
                                    <label htmlFor="serviceTitle">Тема обращения *</label>
                                    <Input
                                        className="elementMarginBottom-tiketEditPut"
                                        type="text"
                                        id="serviceTitle"
                                        value={state.serviceTitle}
                                        onChange={inputChangeHandler}
                                        name="serviceTitle"
                                        required
                                        allowClear
                                    />
                                    <div className="elementMarginBottom-tiketEditPut">
                                        <label htmlFor="description">Полное описание</label>
                                        <TextArea
                                            type="text"
                                            id="description"
                                            rows="6"
                                            value={state.description}
                                            onChange={inputChangeHandler}
                                            name="description"
                                        />
                                    </div>
                                    <label htmlFor="endData">Плановая дата решения *</label>
                                    <DatePicker
                                        format={'DD/MM/YYYY'}
                                        className="elementMarginBottom-tiketEditPut input-width-tiketEditPut"
                                        id="rangePickerData"
                                        value={moment(state.rangePickerData, 'DD/MM/YYYY')}
                                        onChange={rangePickerChangeHandler}
                                        name="rangePickerData"
                                        allowClear={false}
                                    />
                                    <div className="block-Time-tiket">
                                        <TimePicker
                                            format={'HH:mm'}
                                            className="elementMarginBottom-tiketEditPut"
                                            id="time"
                                            value={state.timeHm}
                                            onChange={timePickerChangeHandler}
                                            name="time"
                                            allowClear={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        : null}
                    <div className="block-history-tiketEditPut">
                        <h3>История:</h3>
                        <div className="wrapp-history">
                            <div className="wrapp-history-tiket">
                                <p className="text-tiketEditPut">Создан тикет № 000001</p>
                                <p className="text-tiketEditPut">Назначено на Борщев А. М.</p>
                            </div>
                            <div className="wrapp-history-tiket">
                                <p className="text-tiketEditPut">Борщев А. М. изменил трудозатраты на 3 часа</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default TiketEditPut;