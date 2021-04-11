import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getTopics, getDepartments} from "../../Settings/redux/settingGetters";
import {useParams} from "react-router-dom";
import EditAppealForm from "../../../components/CreateForms/EditAppealForm";
import {fetchAppeal, fetchPutAppeal} from "../redux/appealActions";
import {getAppealCurrent} from "../redux/appealGetters";
import {fetchSettings} from "../../Settings/redux/settingsActions";
import { fetchAllUsers } from "../../AllUsers/redux/usersAction/usersActions";
import { getUsersState } from "../../AllUsers/redux/usersGetters/usersGetters";

const EditAppealPage = () => {
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const departments = useSelector(getDepartments)
    const {users} = useSelector(getUsersState, shallowEqual)
    console.log("employees ", users);
    const appeal = useSelector(getAppealCurrent)
    const {id: appealId} = useParams()
    useEffect(() => {
        dispatch(fetchSettings("topics"));
        dispatch(fetchSettings("departments"))
        // dispatch(fetchAllUsers())
        if(appeal && appeal.departmentId) {
            dispatch(fetchAllUsers({ departmentId: appeal.departmentId}))
        }
        dispatch(fetchAppeal(appealId))
    }, [dispatch]);
    const onChangeFields = (value) => {
        if (value.departmentId) {
            if(appeal && appeal.departmentId) {
                dispatch(fetchAllUsers({ departmentId: appeal.departmentId}))
            }
        }
    }
    const onSaveAppeal = (appeal) => {
        dispatch(fetchPutAppeal(appeal))
    }
    return (
        <EditAppealForm 
        appealFields={appeal} 
        topics={topics} 
        departments={departments} 
        employees={users} 
        onChangeFields={onChangeFields}
        onSaveAppeal={onSaveAppeal}/>
    );
};

export default EditAppealPage;
