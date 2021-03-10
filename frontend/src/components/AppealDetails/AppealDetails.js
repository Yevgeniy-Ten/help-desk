import React from "react";
import {Row, Col} from "antd"

const AppealDetails = ({chat}) => {

    const submitFormHandler = (event) => {

        event.preventDefault();

    }
    return (
        <Row>
            <Col span={24}>
                <h1>Детали обращения #1</h1>
            </Col>
            <Col span={24}>
                <div className="appeal-info">
                    <div className="appeal-info__header">
                        <div className="appeal-text">
                            <h3 className="appeal-text-inner">Тематика усулуги: <strong>Сайты</strong></h3>
                        </div>
                        <div className="appeal-text">
                            <h3 className="appeal-text-inner">Тема обращения: <strong className="appeal-text-inner"> Не
                                работает домен
                            </strong>
                            </h3>
                        </div>
                        <div className="appeal-text-description">
                            <h3 className="appeal-text-inner">Полное описание:</h3>
                            <p className="appeal-text-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ipsa
                                libero
                                molestiae quisquam. Cum
                                earum exercitationem, iure magnam suscipit unde. Facere.
                            </p>
                        </div>
                    </div>
                    <div className="appeal-info__perepiska">
                        <h4 className="appeal-info__perepiska-title">Переписка:</h4>
                        <Row>
                            {
                                chat.map((message, i) => {
                                    const isClient = message.role === "client"
                                    return (
                                        <Col span={24} style={{
                                            display: "flex",
                                            justifyContent: isClient ? "flex-start" : "flex-end"
                                        }}>
                                            <div>
                                                <h5>
                                                    {isClient ? "Вы" : "Служба поддержки"}
                                                </h5>
                                                <p>
                                                    {message.msg}
                                                </p>
                                            </div>
                                        </Col>)
                                })
                            }
                        </Row>
                        <form autoComplete="off" onSubmit={submitFormHandler}>
                            <div>
                                <input type="text" placeholder={"Ваше сообщение"}/>
                                <button type="submit">Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AppealDetails;
