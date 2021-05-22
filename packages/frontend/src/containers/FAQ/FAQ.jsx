import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation
} from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Col, Divider, Row, Avatar } from "antd";
import Websites from "../../components/FAQs/Websites/Websites";
import styles from "./FAQ.module.css";
import SettingsFilter from "../../components/SettingsFilter/SettingsFilter";

const FAQ = () => {
  const pathFaqs = useLocation();
  const dispatch = useDispatch();

  const menuShow = () => {
    dispatch(faqsIconMenuShow(true));
  };

  // useEffect(() => {
  //   if (pathFaqs.pathname === "/faq") {
  //     dispatch(faqsIconMenuShow(null));
  //   }
  //   if (pathFaqs.pathname !== "/faq") {
  //     dispatch(faqsIconMenuShow(true));
  //   }
  // }, [pathFaqs]);
  return (
    <div style={{ padding: "0 20px" }}>
      <Divider orientation="left">Решения</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <SettingsFilter paramFilter={true} />
        </Col>
      </Row>
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
        </Switch>
      </Row>
    </div>
  );
};

export default FAQ;
