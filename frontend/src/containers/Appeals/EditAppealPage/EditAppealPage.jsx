import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../Settings/redux/settingGetters";
import {useParams} from "react-router-dom";
import {fetchTopics} from "../../Settings/redux/settingsActions";
import EditAppealForm from "../../../components/CreateForms/EditAppealForm";

const EditAppealPage = () => {
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const {id} = useParams()
    useEffect(() => {
        dispatch(fetchTopics());
    }, [dispatch]);
    const onSaveAppeal = (appeal) => {
        // диспатчить изменения
    }
    return (
        <EditAppealForm topics={topics} onSaveAppeal={onSaveAppeal}/>
    );
};

export default EditAppealPage;
