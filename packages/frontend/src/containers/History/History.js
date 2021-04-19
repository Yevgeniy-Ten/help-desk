import React, { useEffect } from "react";
import {Breadcrumb, Col, Row} from "antd";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import HistoryTable from "../../components/Tables/HistoryTable/HistoryTable";
import HistoryFilter from "../../components/HistoryFilter/HistoryFilter";
import { getHistory } from "./redux/historyGetters";
import Spinner from "../../components/Spinner/Spinner";
import { fetchHistory } from "./redux/historyActions";

const History = () => {
    const dispatch = useDispatch();
    const {history, loading} = useSelector(getHistory, shallowEqual);
    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);
    const filterFormHandler = (filters) => {
        // диспатчим фильтры на сервер чтобы получить фильтрованные истории
        // dispatch(fetchAppealFilters(filters))
        dispatch(fetchHistory(filters));
    }
    const filterChangeHandler = (e) => {
        // обработчик на изменение назначений
    }
    return (
        <Row style={{padding: "10px 20px"}}>
            <Col span={24} className={"mb-sm"}>
                <Breadcrumb>
                    <Breadcrumb.Item>История:</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={17}>
                {loading ? <Spinner/> : <HistoryTable history={history}/>}
            </Col>
            <Col push={1} span={5}>
                <HistoryFilter
                loading={loading}
                filterChangeHandler={filterChangeHandler}
                filterSubmitHandler={filterFormHandler}
                />
            </Col>
        </Row>
    );
};

export default History;
