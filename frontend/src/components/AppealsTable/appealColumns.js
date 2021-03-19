export const appealColumns = [
    {
        title: "Дата",
        dataIndex: "createdDate",
        key: "date",
    },
    {
        title: "ID заявки",
        dataIndex: "appealId",
        key: "appeal",
    },
    {
        title: "Тематика",
        dataIndex: "topic",
        key: "topic",
        render: topic => topic.name
    },
    {
        title: "Действие",
        dataIndex: "action",
        key: "action",
        render: action => action.title
    }
];