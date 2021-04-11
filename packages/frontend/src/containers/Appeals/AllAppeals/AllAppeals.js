import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {Row, Col, Breadcrumb, Button} from "antd"
import {fetchAppealFilters, fetchAppeals} from "../redux/action/appealsAction";
import {getAppealsState} from "../redux/getters/getters";
import AppealsFilter from "../../../components/AppealsFilter/AppealsFilter";
import AppealsTable from "../../../components/Tables/AppealsTable/AppealsTable";
import AdminAppealsTable from "../../../components/Tables/AdminAppealsTable/AdminAppealsTable";
import {getUser} from "../../Auth/redux/getters/getters";
import Spinner from "../../../components/Spinner/Spinner";
import { NavLink } from "react-router-dom";

const AllAppeals = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    const isAdmin = true
    const {appeals, loading} = useSelector(getAppealsState, shallowEqual);
    useEffect(() => {
        dispatch(fetchAppeals());
    }, [dispatch]);
    const filterFormHandler = (filters) => {
        // диспатчим фильтры на сервер чтобы получить фильтрованные заявки
        dispatch(fetchAppealFilters(filters))
    }
    const filterChangeHandler = (e) => {
        // обработчик на изменение назначений
    }
    console.log(user)
    return (
        <Row style={{padding: "10px 20px"}}>
            <Col span={24} className={"mb-sm"}>
                <Button key="2">
                    <NavLink to="/appeals/add">Новая заявка</NavLink>
                </Button>
            </Col>
            <Col span={24} className={"mb-sm"}>
                <Breadcrumb>
                    <Breadcrumb.Item>Заявки</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={17}>
                {loading ? <Spinner/> : (
                    <>
                        {(user && user.role && user.role.name==="admin") ? <AdminAppealsTable appeals={appeals}/>
                        : <AppealsTable appeals={appeals}/>}
                    </>
                    )
                }
            </Col>
            <Col push={1} span={5}>
                <AppealsFilter
                    loading={loading}
                    isAdmin={isAdmin}
                    filterChangeHandler={filterChangeHandler}
                    filterSubmitHandler={filterFormHandler}/>
            </Col>
        </Row>
    );
};

export default AllAppeals;