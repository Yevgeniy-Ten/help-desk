import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "../../Settings/redux/settingsActions";
import {getTopics} from "../../Settings/redux/settingGetters";
import {getUser} from "../../Auth/redux/getters/getters";
import CreateAppealForm from "../../../components/CreateForms/CreateAppealForm";
import {fetchCreateAppeal} from "../redux/appealActions";
import "./AddAppealForm.css";
import {getAppealStateLoader} from "../redux/appealGetters";


const AddAppealPage = () => {
        const user = useSelector(getUser)
        const topics = useSelector(getTopics)
        const isLoaded = useSelector(getAppealStateLoader)
        const dispatch = useDispatch();
        const isAdmin = true
        useEffect(() => {
            dispatch(fetchTopics());
        }, [dispatch]);
        const onFieldsChange = (fields) => {
            // обработчик изменения полей
        }
        const onCreateAppeal = (appeal) => dispatch(fetchCreateAppeal(appeal))

        return (
            <CreateAppealForm isLoaded={isLoaded} topics={topics}
                              isAdmin={isAdmin}
                              onCreateAppeal={onCreateAppeal}
                              onFieldsChange={onFieldsChange}/>
        );
    }
;

export default AddAppealPage;
