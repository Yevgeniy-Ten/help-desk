import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "../../Settings/redux/settingsActions";
import {getTopics} from "../../Settings/redux/settingGetters";
import {getUser} from "../../Auth/redux/getters/getters";
import CreateAppealForm from "../../../components/CreateForms/CreateAppealForm";
import "./AddAppealForm.css";


const AddAppealPage = () => {
        const user = useSelector(getUser)
        const topics = useSelector(getTopics)
        const dispatch = useDispatch();
        const isAdmin = true
        useEffect(() => {
            dispatch(fetchTopics());
        }, [dispatch]);
        const onFieldsChange = (fields) => {

        }
        const onCreateAppeal = (appeal) => {
            console.log(appeal)
        }

        return (
            <CreateAppealForm topics={topics}
                              isAdmin={isAdmin}
                              onCreateAppeal={onCreateAppeal}
                              onFieldsChange={onFieldsChange}/>
        );
    }
;

export default AddAppealPage;
