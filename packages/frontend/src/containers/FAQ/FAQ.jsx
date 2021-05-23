import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation
} from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Col, Divider, Row, Drawer, Avatar } from "antd";
import Answers from "../../components/FAQs/Answers/Answers";
import styles from "./FAQ.module.css";
import SettingsFilter from "../../components/SettingsFilter/SettingsFilter";
import FAQsCreateEditForm from "../../components/FAQs/FAQsCreateEditForm/FAQsCreateEditForm";
import { useToggle } from "../../hooks/useToggle";
import { fetchFaq } from "./redux/faqsActions";

const FAQ = () => {
  const dispatch = useDispatch();
  const [drawerIsOpen, toggleDrawerIsOpen] = useToggle(false);
  const [faqId, setFaqId] = useState(null);
  const onShowSettingEditor = (id) => {
    setFaqId(id);
    toggleDrawerIsOpen();
  };
  const closeDrawerWithResetSettingFields = () => {
    toggleDrawerIsOpen();
  };
  useEffect(() => {
    dispatch(fetchFaq());
  }, []);
  return (
    <div style={{ padding: "0 20px" }}>
      <Divider orientation="left">Решения</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <SettingsFilter
            paramFilter={true}
            onShowEditor={(idForEdit) => {
              return onShowSettingEditor();
            }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Answers
          onShowEditor={(idForEdit) => {
            return onShowSettingEditor(idForEdit);
          }}
        />
        <Col span={24}>
          <Drawer
            title="Форма FAQ"
            width={500}
            placement="right"
            closable={true}
            onClose={closeDrawerWithResetSettingFields}
            visible={drawerIsOpen}
          >
            <FAQsCreateEditForm
              onCloseEditor={toggleDrawerIsOpen}
              faqId={faqId}
            />
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default FAQ;
