import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../Settings/redux/settingGetters";
import {useParams} from "react-router-dom";
import {fetchTopics} from "../../Settings/redux/settingsActions";
import EditAppealForm from "../../../components/CreateForms/EditAppealForm";
import {fetchAppeal, fetchPutAppeal} from "../redux/appealActions";
import {getAppealCurrent} from "../redux/appealGetters";

const EditAppealPage = () => {
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const appeal = useSelector(getAppealCurrent)
    const {id: appealId} = useParams()
    useEffect(() => {
        dispatch(fetchTopics());
        dispatch(fetchAppeal(appealId))
    }, [dispatch]);
    const onSaveAppeal = (appeal) => {
        dispatch(fetchPutAppeal(appeal))
    }
    return (
        <EditAppealForm appealFields={appeal} topics={topics} onSaveAppeal={onSaveAppeal}/>
    );
};

export default EditAppealPage;
