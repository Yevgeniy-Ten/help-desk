import React from "react";
import { Grid, Button, Container } from '@material-ui/core';
import './DetailAppealForm.css';

const DetailAppealForm = () => {
    const obwenie = [
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Юля",
            msg: "Добрый ден как дела! всё хорошо",
            role: "Служба поддерки"
        },
    ];
    const submitFormHandler = (event) => {

        event.preventDefault();

    }
    return (
        <Container maxWidth="md" component="main">
            <div className="appeal-info">
                <div className="appeal-info__header">
                    <div className="appeal-text">
                        <h3 className="appeal-text-inner">Тип усулги:</h3> <span className="appeal-text-inner"> Обслуживание</span>
                    </div>
                    <div className="appeal-text">
                        <h3 className="appeal-text-inner">Тема обращения:</h3> <strong className="appeal-text-inner"> Не работает домен</strong>
                    </div>
                    <div className="appeal-text-description">
                        <h3 className="appeal-text-inner">Полное описание:</h3>
                        <p className="appeal-text-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa libero molestiae quisquam. Cum
                        earum exercitationem, iure magnam suscipit unde. Facere.
                    </p>
                    </div>
                </div>
                <div className="appeal-info__perepiska">
                    <h4 className="appeal-info__perepiska-title">Переписка:</h4>
                    {
                        obwenie.map((message, i) => {
                            let rowClasses;
                            const isClient = message.role === "client"
                            if (isClient) {
                                rowClasses = "appeal-info__perepiska-flex-start";
                            } else {
                                rowClasses = "appeal-info__perepiska-flex-end";
                            }
                            return (
                                <div key={i} className={rowClasses}>
                                    <div className="perepiska__wrapp">
                                        <h5 className="perepiska__title">
                                            {isClient ? "Вы" : "Служба поддержки"}
                                        </h5>
                                        <p className="perepiska__message">
                                            {message.msg}
                                        </p>
                                    </div>
                                </div>)
                        })
                    }
                    <form autoComplete="off" onSubmit={submitFormHandler}>
                        <div>
                            <input type="text" placeholder={"Ваше сообщение"} />
                            <button type="submit">Отправить</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default DetailAppealForm;
