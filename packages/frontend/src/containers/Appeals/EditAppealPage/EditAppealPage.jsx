import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getTopics, getDepartments} from "../../Settings/redux/settingGetters";
import {useParams} from "react-router-dom";
import EditAppealForm from "../../../components/CreateForms/EditAppealForm";
import {fetchAppeal, fetchPutAppeal} from "../redux/appealActions";
import {getAppealCurrent} from "../redux/appealGetters";
import {fetchSettings} from "../../Settings/redux/settingsActions";
import {fetchAllUsers} from "../../AllUsers/redux/usersAction/usersActions";
import {getUsersState} from "../../AllUsers/redux/usersGetters/usersGetters";

const EditAppealPage = () => {
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const departments = useSelector(getDepartments)
    const {users} = useSelector(getUsersState, shallowEqual)
    const appeal = useSelector(getAppealCurrent)
    const {id: appealId} = useParams()
    useEffect(() => {
        if (!appeal) {
            dispatch(fetchAppeal(appealId))
        }
        dispatch(fetchSettings("topics"));
        dispatch(fetchSettings("departments"))
        if (appeal && appeal.departmentId) {
            console.log("get request department")
            dispatch(fetchAllUsers({departmentId: appeal.departmentId}))
        }
    }, [dispatch, appeal, appealId]);
    const onChangeFields = (value) => {
        if (value.departmentId) {
            if (appeal && appeal.departmentId) {
                dispatch(fetchAllUsers({departmentId: appeal.departmentId}))
            }
        }
    }
    const onSaveAppeal = (appeal) => {
        dispatch(fetchPutAppeal(appealId, appeal))
    }
    return (
        <>
            {appeal ? <EditAppealForm
                appealFields={appeal}
                topics={topics}
                departments={departments}
                employees={users}
                onChangeFields={onChangeFields}
                onSaveAppeal={onSaveAppeal}/> : <p>Заявка не найдена</p>}
        </>
    );
};

export default EditAppealPage;
