import React from "react";
import {useDispatch} from "react-redux";
import AppealDetails from "../../../components/AppealDetails/AppealDetails";

const DetailAppealPage = () => {
    const dispatch = useDispatch();
    const chat = [
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

    return (
        <AppealDetails chat={chat}/>
    );
};

export default DetailAppealPage;