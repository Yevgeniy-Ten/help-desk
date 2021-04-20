import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { NavLink } from "react-router-dom";
import { getHourWork } from "../../../helpers/helpers";

const AdminAppealsTable = ({ appeals }) => {
  const appealColumns = [
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
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Заявка от",
      dataIndex: "clientRequest",
      key: "clientRequest",
      render: (creator) => {
        return `${creator.firstName} ${creator.lastName}`;
      }
    },
    {
      title: "Тематика",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => {
        return topic.title;
      }
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
      dataIndex: "department",
      key: "department",
      render: (department) => {
        return department.title;
      }
    },
    {
      title: "Ответствейнный сотрудник",
      dataIndex: "employeeRequest",
      key: "employeeRequest",
      render: (employeeRequest) => {
        return employeeRequest
          ? `${employeeRequest.firstName} ${employeeRequest.lastName}`
          : null;
      }
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
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <NavLink to={`/appeals/${record.id}`}>Детали</NavLink>
            <NavLink to={`/appeals/${record.id}/edit`}>Редактировать</NavLink>
            <Button danger={true}>Удалить</Button>
          </Space>
        );
      }
    }
  ];
  return (
    <Table scroll={{ x: 1100 }} columns={appealColumns} dataSource={appeals} />
  );
};

export default AdminAppealsTable;
