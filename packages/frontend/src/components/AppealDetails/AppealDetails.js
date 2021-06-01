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
      <Card
        style={{ textAlign: "center" }}
        title={`Детали обращения #${appeal.id}`}
        bordered={false}
      >
        <Meta title={`Тематика: ${appeal.topic.title}`} className="mb-sm" />
        <Meta title={`Приоритет: ${appeal.priority}`} className="mb-sm" />
        <Meta title={`В статусе: ${appeal.status}`} className="mb-sm" />
        <h3>Описание</h3>
        <p>{appeal.description} </p>
      </Card>
    </>
  );
};

export default AppealDetails;
