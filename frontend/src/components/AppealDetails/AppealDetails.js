import React from "react";
import {
    Button, Card,
} from "antd"
import "./AppealDetails.css";

const {Meta} = Card
const AppealDetails = ({appeal}) => {
    return (
        <Card title={`Детали обращения #${appeal.id}`} bordered={false}
              extra={<Button danger>Отозвать</Button>}>
            <Meta title={`Тематика: ${appeal.topic.name}`} className={"mb-sm"}/>
            <Meta title={`Описание:`} description={appeal.description}/>
        </Card>
    );
};

export default AppealDetails;
