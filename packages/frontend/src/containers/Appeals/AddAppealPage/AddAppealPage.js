import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {fetchSettings} from "../../Settings/redux/settingsActions";
import {getTopics} from "../../Settings/redux/settingGetters";
import {getUser, getUsersState} from "../../Auth/redux/getters/getters";
import CreateAppealForm from "../../../components/CreateForms/CreateAppealForm";
import {fetchCreateAppeal} from "../redux/appealActions";
import "./AddAppealForm.css";
import {getAppealStateLoader} from "../redux/appealGetters";
import { fetchAllUsers } from "../../AllUsers/redux/usersAction/usersActions";

const AddAppealPage = () => {
    const user = useSelector(getUser)
    const {users} = useSelector(getUsersState, shallowEqual)
    const topics = useSelector(getTopics)
    const isLoaded = useSelector(getAppealStateLoader)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSettings("topics"));
        dispatch(fetchAllUsers())
    }, [dispatch]);
    const onFieldsChange = (fields) => {
        // обработчик изменения полей
    }
    const onCreateAppeal = (appeal) => dispatch(fetchCreateAppeal(appeal))

    return (
        <CreateAppealForm isLoaded={isLoaded} topics={topics}
                            user={user}
                            users={users}
                            onCreateAppeal={onCreateAppeal}
                            onFieldsChange={onFieldsChange}/>
    );
};

export default AddAppealPage;
