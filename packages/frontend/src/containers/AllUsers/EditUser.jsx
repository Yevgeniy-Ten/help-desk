import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchUserForUpdate} from "./redux/usersAction/usersActions";
import Spinner from "../../components/Spinner/Spinner";
import UserDetails from "../../components/UserDetails/UserDetails";
import {fetchSettings} from "../Settings/redux/settingsActions";
import {getCompanies, getDepartments} from "../Settings/redux/settingGetters";
import {getUsersState} from "../Auth/redux/getters/getters";

const EditUser = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {userForUpdate, isLoading} = useSelector(
        getUsersState, shallowEqual);
    const departments = useSelector(getDepartments)
    const companies = useSelector(getCompanies)
    useEffect(() => {
        dispatch(fetchUserForUpdate(id));
        dispatch(fetchSettings("departments"))
        dispatch(fetchSettings("companies"))
    }, [dispatch, id]);
    return (
        <>
            {isLoading ? <Spinner/> :
                <UserDetails departments={departments} userInfo={userForUpdate} companies={companies}/>}
        </>
    );
};

export default EditUser;
