import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTicketsState } from "../redux/getters/getters";
import TicketsFilter from "../../../components/TicketsFilter/TicketsFilter";
import { fetchTickets } from "../redux/action/ticketsAction";
import {Breadcrumb, Col, Row} from "antd";
import TableTickets from "../../../components/UI/TableForm/TableTickets";


const AllTickets = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector(getTicketsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);
    const filterFormHandler=(filters)=>{
        console.log(filters)
        // будем диспатчить фильтры
    }
    return (
        <>
            <Row style={{padding:"0 20px"}}>
                <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Заявки</Breadcrumb.Item>
                    </Breadcrumb>,
                </Col>
                <Col span={17}>
                    <TableTickets tickets={tickets} />
                </Col>
                <Col push={1} span={5}>
                    <TicketsFilter filterFormHandler={filterFormHandler} />
                </Col>
            </Row>
        </>
    );
};

export default AllTickets;