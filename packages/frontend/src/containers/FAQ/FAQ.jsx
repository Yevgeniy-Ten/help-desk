import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation
} from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getMenuShow } from "./redux/faqsGetters";
import { faqsIconMenuShow } from "./redux/faqsActions";
import { Col, Divider, Row, Avatar } from "antd";
import Websites from "./Websites/Websites";
import Supports from "./Supports/Supports";
import Bookkeeping from "./Bookkeeping/Bookkeeping";
import Medicine from "./Medicine/Medicine";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const pathUrl = useLocation();
  const dispatch = useDispatch();

  const { iconMenuShow } = useSelector(getMenuShow, shallowEqual);

  const menuShow = () => {
    dispatch(faqsIconMenuShow(true));
  };

  useEffect(() => {
    if (pathUrl.pathname === "/faq") {
      dispatch(faqsIconMenuShow(null));
    }
    if (pathUrl.pathname !== "/faq") {
      dispatch(faqsIconMenuShow(true));
    }
  }, [pathUrl]);
  return (
    <div style={{ padding: "0 20px" }}>
      <Divider orientation="left">Решения</Divider>
      {!iconMenuShow && (
        <Row gutter={16}>
          <Col span={6}>
            <NavLink to="/faq/websites" className="ml-sm" onClick={menuShow}>
              <div className={styles.card}>
                <Avatar
                  size={128}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Mo_yec-4l6efC3W2cmFzt7c0E-nKhKYkjA&usqp=CAU"
                />
                <h4>Сайты</h4>
              </div>
            </NavLink>
          </Col>
          <Col span={6}>
            <NavLink to="/faq/bookkeeping" className="ml-sm" onClick={menuShow}>
              <div className={styles.card}>
                <Avatar
                  size={128}
                  src="https://img2.freepng.ru/20180329/iaq/kisspng-accounting-accountant-computer-icons-bookkeeping-f-finance-5abc92d426a2b6.3434380115223077961583.jpg"
                />
                <h4>Бухгалтерия</h4>
              </div>
            </NavLink>
          </Col>
          <Col span={6}>
            <NavLink to="/faq/supports" className="ml-sm" onClick={menuShow}>
              <div className={styles.card}>
                <Avatar
                  size={128}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2LtRn8UowmBomodLPh2jo04ODGP8DDJD4w&usqp=CAU"
                />
                <h4>Техническая поддержка</h4>
              </div>
            </NavLink>
          </Col>
          <Col span={6}>
            <NavLink to="/faq/medicine" className="ml-sm" onClick={menuShow}>
              <div className={styles.card}>
                <Avatar
                  size={128}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_K8YJfZwPU1GhJ3xS3FVYnZ2jqMr_CDOwZQ&usqp=CAU"
                />
                <h4>Медицина</h4>
              </div>
            </NavLink>
          </Col>
        </Row>
      )}
      <Row>
        <Switch>
          <Route
            path="/faq/websites"
            render={(props) => {
              return (
                <Websites
                  {...props}
                  onShowEditor={(idForEdit) => {
                    return console.log("topics", idForEdit);
                  }}
                />
              );
            }}
          />
          <Route
            path="/faq/bookkeeping"
            render={(props) => {
              return (
                <Bookkeeping
                  {...props}
                  onShowEditor={(idForEdit) => {
                    return console.log("companies", idForEdit);
                  }}
                />
              );
            }}
          />
          <Route
            path="/faq/supports"
            render={(props) => {
              return (
                <Supports
                  {...props}
                  // currentPage={currentReglamentPage}
                  // onChangeCurrentPage={setCurrentReglamentPage}
                  onShowEditor={(idForEdit) => {
                    return console.log("reglaments", idForEdit);
                  }}
                />
              );
            }}
          />
          <Route
            path="/faq/medicine"
            render={(props) => {
              return (
                <Medicine
                  {...props}
                  onShowEditor={(idForEdit) => {
                    return console.log("departments", idForEdit);
                  }}
                />
              );
            }}
          />
        </Switch>
      </Row>
    </div>
  );
};

export default FAQ;
