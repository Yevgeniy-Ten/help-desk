import React from "react";
import { Table, Tag } from "antd";
import { getHourWork } from "../../../helpers/helpers";

const HistoryTable = ({ history }) => {
  const historyColumns = [
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => {
        if (a.createdAt.valueOf() > b.createdAt.valueOf()) return 1;
        if (a.createdAt.valueOf() < b.createdAt.valueOf()) return -1;
      },
      render: (createdAt) => {
        return new Date(createdAt).toLocaleDateString("ru", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        });
      }
    },
    {
      title: "ID заявки",
      dataIndex: "requestId",
      key: "requestId",
      sorter: (a, b) => {
        return a.requestId - b.requestId;
      }
    },
    {
      title: "Тематика",
      dataIndex: "topicTitle"
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      key: "priority",
      filters: [
        {
          text: "Стандартно",
          value: "Стандартно"
        },
        {
          text: "Средний",
          value: "Средний"
        },
        {
          text: "Срочно",
          value: "Срочно"
        },
        {
          text: "Критично",
          value: "Критично"
        }
      ],
      onFilter: (value, record) => {
        return record.priority.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        return a.priority.length - b.priority.length;
      },
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
      key: "status",
      filters: [
        {
          text: "Открыто",
          value: "Открыто"
        },
        {
          text: "Выполняется",
          value: "Выполняется"
        },
        {
          text: "Приостановлено",
          value: "Приостановлено"
        },
        {
          text: "Выполнено",
          value: "Выполнено"
        }
      ],
      onFilter: (value, record) => {
        return record.status.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        return a.status.length - b.status.length;
      }
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
