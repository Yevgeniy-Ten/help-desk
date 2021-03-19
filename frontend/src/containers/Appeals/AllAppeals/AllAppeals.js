import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {Row, Col, Breadcrumb} from "antd"
import {fetchAppeals} from "../redux/action/appealsAction";
import {getAppealsState} from "../redux/getters/getters";
import AppealsFilter from "../../../components/AppealsFilter/AppealsFilter";
import TableAppeals from "../../../components/UI/TableForm/TableAppeals";
import AppealsTable from "../../../components/AppealsTable/AppealsTable";

const AllAppeals = () => {
    const dispatch = useDispatch();
    const {appeals, loading} = useSelector(getAppealsState, shallowEqual);
    useEffect(() => {
        dispatch(fetchAppeals());
    }, [dispatch]);
    const filterFormHandler = (filters) => {
        console.log(filters)
        // будем диспатчить фильтры
    }
    const appealsState = [{
        createdDate: new Date().toJSON(),
        appealId: 1,
        topic: {
            name: "Сайты"
        },
        action:{
            title:"Сменился статус"
        }
    }]
    return (
        <Row style={{padding: "0 20px"}}>
            <Col span={24}>
                <Breadcrumb>
                    <Breadcrumb.Item>Заявки</Breadcrumb.Item>
                </Breadcrumb>,
            </Col>
            <Col span={17}>
                <AppealsTable appeals={appealsState}/>
            </Col>
            <Col push={1} span={5}>
                <AppealsFilter filterSubmitHandler={filterFormHandler}/>
            </Col>
        </Row>
    );
};

export default AllAppeals;