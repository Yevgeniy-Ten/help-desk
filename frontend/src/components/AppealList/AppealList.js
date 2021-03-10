import React from "react";
import {List} from "antd";
import {Link} from "react-router-dom"

const AppealList = ({appeals}) => {
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={appeals}
            renderItem={appeal => (
                <List.Item
                    actions={[<Link to={`/appeals/${appeal.id}`}>Детали обращения</Link>]}
                >
                    <List.Item.Meta
                        title={<a href="https://ant.design"> Обращение #{appeal.id}: {appeal.title}</a>}
                        description={appeal.description}
                    />
                    <div>content</div>
                </List.Item>
            )}
        />
    );
};

export default AppealList;