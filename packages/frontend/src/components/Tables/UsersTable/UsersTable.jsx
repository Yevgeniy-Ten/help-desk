import React, { useState, useRef } from "react";
import { Button, Space, Table, Input, Divider } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const UsersTable = ({ users, onAuthorizeUser, companies }) => {
  let searchInput = useRef();
  const [state, setState] = useState({
    searchText: " ",
    searchedColumn: " "
  });
  const filtersCopy = () => {
    let filterCompany = [];
    if (companies) {
      filterCompany = companies.map((company) => {
        return {
          text: company.title,
          value: company.title
        };
      });
    }
    return filterCompany;
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={(node) => {
                // eslint-disable-next-line no-undef
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => {
                return setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                return handleSearch(selectedKeys, confirm, dataIndex);
              }}
              style={{ marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  return handleSearch(selectedKeys, confirm, dataIndex);
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Найти
              </Button>
              <Button
                onClick={() => {
                  return handleReset(clearFilters);
                }}
                size="small"
                style={{ width: 90 }}
              >
                Сборсить
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => {
        return (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );
      },
      onFilter: (value, record) => {
        return record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "";
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // eslint-disable-next-line no-undef
            return searchInput.select();
          }, 100);
        }
      },
      render: (text) => {
        return state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape={true}
            // eslint-disable-next-line react/destructuring-assignment
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        );
      }
    };
  };

  const usersColumns = [
    {
      title: "Имя Фамилия",
      key: "full_name",
      render: (user) => {
        return `${user.firstName} ${user.lastName}`;
      }
    },
    {
      title: "Компания",
      dataIndex: "company",
      key: "company",
      filters: filtersCopy(),
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        let aCopy = null;
        let bCopy = null;
        if (a.company && b.company) {
          aCopy = a.company.title;
          bCopy = b.company.title;
          if (aCopy > bCopy) return 1;
          if (aCopy < bCopy) return -1;
        }
        if (a.company === null) {
          aCopy = "Не выбрано";
        }
        if (b.company === null) {
          bCopy = "Не выбрано";
        }
        return aCopy - bCopy;
      },
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        if (record.company) {
          return record.company.title.indexOf(value) === 0;
        }
      },
      render: (company) => {
        return company ? company.title : "Не выбрано";
      }
    },
    {
      title: "Из отдела",
      dataIndex: "orgStructure",
      key: "orgStructure",
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        let aCopy = null;
        let bCopy = null;
        if (a.orgStructure && b.orgStructure) {
          aCopy = a.orgStructure.departmentId;
          bCopy = b.orgStructure.departmentId;
          return aCopy - bCopy;
        }
        if (a.orgStructure === null) {
          aCopy = -1;
        }
        if (b.orgStructure === null) {
          bCopy = -1;
        }
        return aCopy - bCopy;
      },
      render: (orgStructure) => {
        return orgStructure && orgStructure.department
          ? orgStructure.department.title
          : "Не выбрано";
      }
    },
    {
      title: "Должность",
      dataIndex: "orgStructure",
      key: "orgStructure",
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        let aCopy = null;
        let bCopy = null;
        if (a.orgStructure && b.orgStructure) {
          aCopy = a.orgStructure.positionId;
          bCopy = b.orgStructure.positionId;
          return aCopy - bCopy;
        }
        if (a.orgStructure === null) {
          aCopy = -1;
        }
        if (b.orgStructure === null) {
          bCopy = -1;
        }
        return aCopy - bCopy;
      },
      render: (orgStructure) => {
        return orgStructure && orgStructure.position
          ? orgStructure.position.title
          : "Не выбрано";
      }
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Админ",
          value: "admin"
        },
        {
          text: "Клиент",
          value: "client"
        }
      ],
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        if (a.role.name > b.role.name) return 1;
        if (a.role.name < b.role.name) return -1;
      },
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        return record.role.name.indexOf(value) === 0;
      },
      render: (role) => {
        return role ? role.name : "Нет роли";
      }
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
      key: "email",
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        if (a.email > b.email) return 1;
        if (a.email < b.email) return -1;
      },
      ...getColumnSearchProps("email")
    },
    {
      title: "Почта",
      dataIndex: "isFake",
      key: "isFake",
      defaultSortOrder: "descend",
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        if (a.isFake > b.isFake) return 1;
        if (a.isFake < b.isFake) return -1;
      },
      render: (isFake) => {
        return isFake ? (
          <span style={{ textAlign: "center", color: "#ff4d4f" }}>
            Не подтверждена
          </span>
        ) : (
          <span style={{ textAlign: "center", color: "#99c578" }}>
            Подтверждена
          </span>
        );
      }
    },
    {
      title: "Действия",
      key: "action",
      render: (text, user) => {
        return (
          <Space>
            {!user.isAuthorized && (
              <Button
                onClick={onAuthorizeUser.bind(null, user.id)}
                type="primary"
              >
                Потвердить
              </Button>
            )}
            <NavLink to={`/users/edit/${user.id}`}>
              <Button type="dashed">Редактировать</Button>
            </NavLink>
            <Button danger={true}>Удалить</Button>
          </Space>
        );
      }
    }
  ];

  return (
    <Table
      title={() => {
        return (
          <>
            <div className="flex-between">
              <h3>Контакты</h3>
              <NavLink to="/users/create">
                <Button type="primary">Создать пользователя</Button>
              </NavLink>
            </div>
          </>
        );
      }}
      bordered={true}
      columns={usersColumns}
      dataSource={users}
    />
  );
};

export default UsersTable;
