import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row } from "antd";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import HistoryTable from "../../components/Tables/HistoryTable/HistoryTable";
import HistoryFilter from "../../components/HistoryFilter/HistoryFilter";
import { getHistory } from "./redux/historyGetters";
import Spinner from "../../components/Spinner/Spinner";
import { fetchHistory } from "./redux/historyActions";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const History = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const dispatch = useDispatch();
  const { history, loading } = useSelector(getHistory, shallowEqual);
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);
  const filterFormHandler = (filters) => {
    dispatch(fetchHistory(filters));
  };
  console.log(history);
  const filterChangeHandler = (e) => {
    // обработчик на изменение назначений
  };
  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        <Breadcrumb>
          <Breadcrumb.Item>История:</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      {/* <Col span={17}>
                {loading ? <Spinner/> : <HistoryTable history={history}/>}
            </Col>
            <Col push={1} span={5}>
                <HistoryFilter
                loading={loading}
                filterChangeHandler={filterChangeHandler}
                filterSubmitHandler={filterFormHandler}
                />
            </Col> */}
      <Col span={!collapsed ? 23 : 18}>
        {loading ? <Spinner /> : <HistoryTable history={history} />}
      </Col>
      <Col span={0.5} className="p-2">
        {collapsed ? (
          <MenuUnfoldOutlined onClick={toggle} className="filter-icon" />
        ) : (
          <MenuFoldOutlined onClick={toggle} className="filter-icon" />
        )}
      </Col>
      <Col span={!collapsed ? 0 : 5}>
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
