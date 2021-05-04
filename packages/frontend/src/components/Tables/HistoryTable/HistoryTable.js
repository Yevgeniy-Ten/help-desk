import React from "react";
import { Table, Tag } from "antd";
import { getHourWork } from "../../../helpers/helpers";

const HistoryTable = ({ history }) => {
  const historyColumns = [
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return new Date(createdAt).toLocaleDateString();
      }
    },
    {
      title: "ID заявки",
      dataIndex: "requestId",
      key: "requestId"
    },
    {
      title: "Тематика",
      dataIndex: "topicTitle"
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let color = "green";
        if (priority === "Срочно") {
          color = "gold";
        } else if (priority === "Средний") {
          color = "cyan";
        } else if (priority === "Критично") {
          color = "red";
        }
        // eslint-disable-next-line react/destructuring-assignment
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Ответственный отдел",
      dataIndex: "departmentTitle",
      key: "departmentTitle"
    },
    {
      title: "Ответствейнный сотрудник",
      dataIndex: "employeeName"
      // render: (employeeId) => employeeId ? `${employeeId.firstName} ${employeeId.lastName}` : null
    },
    {
      title: "Срок исполнения (часов)",
      dataIndex: "deadline",
      key: "deadline"
    },
    {
      title: "Затрачено (часов)",
      dataIndex: "hourWork",
      key: "hourWork",
      render: (hourWork) => {
        return getHourWork(hourWork);
      }
    },
    {
      title: "Комментарии",
      dataIndex: "comment",
      key: "comment"
    }
  ];
  return (
    <Table scroll={{ x: 1100 }} columns={historyColumns} dataSource={history} />
  );
};

export default HistoryTable;
