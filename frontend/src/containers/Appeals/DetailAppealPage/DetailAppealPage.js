import React, {useEffect} from "react";
import {useDispatch, shallowEqual, useSelector} from "react-redux";
import AppealDetails from "../../../components/AppealDetails/AppealDetails";
import {useParams} from "react-router-dom"
import {fetchAppeal} from "../redux/appealActions";
import {getAppealState} from "../redux/appealGetters";
import AppealChat from "../AppealChat/AppealChat";

const DetailAppealPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {appeal} = useSelector(getAppealState, shallowEqual);

    // useEffect(() => {
    //     dispatch(fetchAppeal(id));
    // }, [dispatch])

    const localAppeal = {
        createdAt: "2021-03-16T07:58:26.000Z",
        id: 4,
        status: "started",
        topic: {
            name: "Сайты"
        },
        title: "У меня что то не работает",
        topicId: 3,
        updatedAt: "2021-03-16T08:12:00.000Z",
        userId: 5,
        description:"Какое то описание"
    }

    return (
        <div style={{padding: "10px 20px"}}>
            {localAppeal ? <AppealDetails appeal={localAppeal}/> : <p>Заявка не найдена</p>}
            {localAppeal && <AppealChat />}
        </div>
    );
};

export default DetailAppealPage;