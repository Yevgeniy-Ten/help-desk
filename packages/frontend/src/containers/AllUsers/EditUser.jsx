import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUpdatedUser, fetchUserForUpdate } from "./redux/usersAction/usersActions";
import Spinner from "../../components/Spinner/Spinner";
import UserDetails from "../../components/UserDetails/UserDetails";
import { fetchSettings } from "../Settings/redux/settingsActions";
import { getCompanies, getDepartments, getOrgStructures, getSettingsLoader } from "../Settings/redux/settingGetters";
import { getUsersState } from "../Auth/redux/getters/getters";
import { Form } from "antd";

const EditUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const settingIsLoad = useSelector(getSettingsLoader)
    const orgStructures = useSelector(getOrgStructures)
    const { userForUpdate, isLoading } = useSelector(
        getUsersState, shallowEqual);
    const departments = useSelector(getDepartments)
    const companies = useSelector(getCompanies)
    const [form] = Form.useForm();
    const onFinish = (value) => {
        if (value) dispatch(fetchUpdatedUser(value, id));
    };
    const onChangeFields = (value) => {
        if (value.departmentId) {
            dispatch(fetchSettings("orgstructure", { departmentId: value.departmentId }))
        }
    }
    useEffect(() => {
        dispatch(fetchUserForUpdate(id));
        dispatch(fetchSettings("departments", { id: id }))
        dispatch(fetchSettings("companies", { id: id }))
        if(userForUpdate.orgStructure) {
            dispatch(fetchSettings("orgstructure", { departmentId: userForUpdate.orgStructure.departmentId }))
        }
    }, [dispatch, id]);
    return (
        <>
            {isLoading ? <Spinner /> : userForUpdate ?
                <UserDetails onFinish={onFinish}
                    orgStructures={orgStructures}
                    isLoading={isLoading}
                    onChangeFields={onChangeFields}
                    form={form}
                    settingIsLoader={settingIsLoad}
                    departments={departments}
                    userInfo={userForUpdate}
                    companies={companies} /> :
                <p>Пользователь не найден.</p>}
        </>
    );
};

export default EditUser;
