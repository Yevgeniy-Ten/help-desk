import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid, Button, Container } from '@material-ui/core';
import { Input } from 'antd';

import FileInput from '../Form/FileInput';
import Spinner from '../Spinner/Spinner';
import BackDrop from '../BackDrop/Backdrop';
import './AddAppealForms.css';

import { addNewAppeals } from '../redux/action/appealsAction';
import { getAppealsState } from '../redux/getters/getters';



const AddAppealForm = () => {
    const dispatch = useDispatch();
    const { TextArea } = Input;

    const { appealsList } = useSelector(getAppealsState, shallowEqual);

    const user = useSelector(state => state.users.user)

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        // service: "",
        // title: "",
        // description: "",
        shortDescription: "",
        fullDescription: "",
        // image: "",
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
        // setState(prevState => {
        //     return {
        //         ...prevState,
        //         [name]: file,
        //     }
        // }
        // )
    }

    const submitFormHandler = async (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // Object.keys(state).forEach(key => {
        //     formData.append(key, state[key]);
        // })
        // await dispatch(addNewAppeals(formData));
        await dispatch(addNewAppeals(state));
    }

    // useEffect(() => {
    //     dispatch(addNewAppeals());
    // })

    return (
        <>
            {loading && <>
                <BackDrop show={loading} />
                <Spinner />
            </>
            }
            <Container maxWidth="md" component="main">
                <div className="block-newAppeal">
                    <form autoComplete="off" onSubmit={submitFormHandler}
                        className="block-form-newAppeal">
                        <div className="block-inputs-newAppeal">
                            <label htmlFor="service">Тип услуги *</label>
                            <Input
                                className="elementMarginBottom-newAppeal serviceInput-width-newAppeal"
                                type="text"
                                id="service"
                                value={state.service}
                                onChange={inputChangeHandler}
                                name="service"
                                allowClear
                                // required
                                disabled
                            />
                            <label htmlFor="shortDescription">Тема обращения *</label>
                            {/* <label htmlFor="title">Тема обращения *</label> */}
                            <Input
                                className="elementMarginBottom-newAppeal input-width-newAppeal"
                                type="text"
                                id="shortDescription"
                                // id="title"
                                // value={state.title}
                                // name="title"
                                value={state.shortDescription}
                                onChange={inputChangeHandler}
                                name="shortDescription"
                                maxLength={150}
                                allowClear
                                required
                            />
                            <div className="elementMarginBottom-newAppeal input-width-newAppeal description-newAppeal">
                                <label htmlFor="fullDescription">Полное описание</label>
                                <TextArea
                                    type="text"
                                    id="fullDescription"
                                    rows="6"
                                    // id="description"
                                    // value={state.description}
                                    // name="description"
                                    value={state.fullDescription}
                                    onChange={inputChangeHandler}
                                    name="fullDescription"
                                />
                            </div>
                            <Grid item>
                                <label htmlFor="image">Загрузите скриншот или фото</label>
                                <FileInput
                                    id="image"
                                    name="image"
                                    label="Image"
                                // onChange={fileChangeHandler}
                                />
                            </Grid>
                            <div className="block-Btn-newAppeal">
                                <Button variant="contained" style={{ width: '120px' }} type="submit" color="primary">Создать</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default AddAppealForm;