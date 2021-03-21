import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {Row, Col, Breadcrumb} from "antd"
import {fetchAppeals} from "../redux/action/appealsAction";
import {getAppealsState} from "../redux/getters/getters";
import AppealsFilter from "../../../components/AppealsFilter/AppealsFilter";
import AppealsTable from "../../../components/Tables/AppealsTable/AppealsTable";
import AdminAppealsTable from "../../../components/Tables/AdminAppealsTable/AdminAppealsTable";
import {getUser} from "../../Auth/redux/getters/getters";

const AllAppeals = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    const isAdmin = true
    const {appeals, loading} = useSelector(getAppealsState, shallowEqual);
    useEffect(() => {
        dispatch(fetchAppeals());
    }, [dispatch]);
    const filterFormHandler = (filters) => {
        console.log(filters)
        // будем диспатчить фильтры отправлять на сервер
    }
    const filterChangeHandler = (e) => {
        console.log(e)
    }
    const appealsState = [{
        createdDate: new Date().toJSON(),
        appealId: 1,
        topic: {
            name: "Сайты"
        },
        action: {
            title: "Сменился статус"
        },
        creator: {
            name: "Евгений"
        },
        employee: {
            name: "Иванов"
        },
        status: "Выполняется",
        priority: "incident",
        hourWorks: 16
    }]
    return (
        <Row style={{padding: "10px 20px"}}>
            <Col span={24} className={"mb-sm"}>
                <Breadcrumb>
                    <Breadcrumb.Item>Заявки</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={17}>
                {isAdmin ? <AdminAppealsTable appeals={appealsState}/>
                    : <AppealsTable appeals={appealsState}/>}
            </Col>
            <Col push={1} span={5}>
                <AppealsFilter
                    isAdmin={isAdmin}
                    filterChangeHandler={filterChangeHandler}
                    filterSubmitHandler={filterFormHandler}/>
            </Col>
        </Row>
    );
};

export default AllAppeals;