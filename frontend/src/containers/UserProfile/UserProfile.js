import React from "react";
import {useSelector} from "react-redux";
import {getUser} from "../Auth/redux/getters/getters";
import {Row, Col} from "antd"
import Avatar from "antd/es/avatar/avatar";

const UserProfile = () => {
    const user = useSelector(getUser)
    return (
        <Row>
            <Col span={6}>
                <div>
                    <Avatar size={128}
                            src={"https://cs7.pikabu.ru/post_img/big/2018/10/20/9/154004999513599819.jpg"}/>
                    <h1>Х</h1>
                </div>
            </Col>
            <Col span={16}>
                Информация:
            </Col>
        </Row>
    );
};

export default UserProfile;
