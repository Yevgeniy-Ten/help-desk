import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Row, Col, Breadcrumb, Button } from "antd";
import {
  fetchAppealFilters,
  fetchAppeals
} from "../redux/action/appealsAction";
import { getAppealsState } from "../redux/getters/getters";
import AppealsFilter from "../../../components/AppealsFilter/AppealsFilter";
import AppealsTable from "../../../components/Tables/AppealsTable/AppealsTable";
import AdminAppealsTable from "../../../components/Tables/AdminAppealsTable/AdminAppealsTable";
import { getUser } from "../../Auth/redux/getters/getters";
import Spinner from "../../../components/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const AllAppeals = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { appeals, loading } = useSelector(getAppealsState, shallowEqual);
  useEffect(() => {
    dispatch(fetchAppeals());
  }, [dispatch]);
  const filterFormHandler = (filters) => {
    dispatch(fetchAppealFilters(filters));
  };
  const filterChangeHandler = (e) => {
    // обработчик на изменение назначений
  };
  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        <Button key="2">
          <NavLink to="/appeals/add">Новая заявка</NavLink>
        </Button>
      </Col>
      <Col span={24} className="mb-sm">
        <Breadcrumb>
          <Breadcrumb.Item>Заявки</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={!collapsed ? 23 : 18}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {user && user.role && user.role.name === "admin" ? (
              <AdminAppealsTable appeals={appeals} />
            ) : (
              <AppealsTable appeals={appeals} />
            )}
          </>
        )}
      </Col>
      <Col span={0.5} className="p-2">
        {collapsed ? (
          <MenuUnfoldOutlined onClick={toggle} className="filter-icon" />
        ) : (
          <MenuFoldOutlined onClick={toggle} className="filter-icon" />
        )}
      </Col>
      <Col span={!collapsed ? 0 : 5}>
        <AppealsFilter
          loading={loading}
          user={user}
          filterChangeHandler={filterChangeHandler}
          filterSubmitHandler={filterFormHandler}
        />
      </Col>
    </Row>
  );
};

export default AllAppeals;
