import React, { useEffect } from "react";
import {useDispatch, shallowEqual, useSelector} from "react-redux";
import AppealDetails from "../../../components/AppealDetails/AppealDetails";
import { fetchAppeal } from "../redux/action/appealsAction";
import { getAppealsState } from "../redux/getters/getters";

const DetailAppealPage = (props) => {
    const dispatch = useDispatch();
    const {appeal} = useSelector(getAppealsState, shallowEqual);
    
    useEffect(() => {
        dispatch(fetchAppeal(props.match.params.id));
    }, [dispatch])

    // const appeal = {
    //     createdAt: "2021-03-16T07:58:26.000Z",
    //     description: "111",
    //     id: 4,
    //     serviceTopicId: null,
    //     status: "started",
    //     ticketId: 1,
    //     title: "Appeal1",
    //     topicId: 3,
    //     updatedAt: "2021-03-16T08:12:00.000Z",
    //     userId: 5,
    // }

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
        <AppealDetails chat={chat} appeal={appeal} />
    );
};

export default DetailAppealPage;