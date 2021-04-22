import React from "react";
import { Button, Card } from "antd";
import { NavLink } from "react-router-dom";
import "./AppealDetails.css";

const { Meta } = Card;
const AppealDetails = ({ appeal }) => {
  return (
    <>
      <Card bordered={true}>
        <div className="btn-block">
          <Button key="3" type="primary">
            <NavLink to="/appeals">Назад</NavLink>
          </Button>
          <Button danger={true}>Отозвать</Button>
        </div>
      </Card>
      <Card title={`Детали обращения #${appeal.id}`} bordered={false}>
        <Meta title={`Тематика: ${appeal.topic.title}`} className="mb-sm" />
        <Meta title="Описание:" description={appeal.description} />
      </Card>
    </>
  );
};

export default AppealDetails;
