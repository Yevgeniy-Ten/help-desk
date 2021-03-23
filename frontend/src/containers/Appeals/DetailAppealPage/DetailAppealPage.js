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
    const onCancelAppeal = (id) => {
        // как то отзывать заявку
    }
    useEffect(() => {
        dispatch(fetchAppeal(id));
    }, [dispatch])
    return (
        <div style={{padding: "10px 20px"}}>
            {appeal ? <AppealDetails appeal={appeal}/> : <p>Заявка не найдена</p>}
            {appeal && <AppealChat/>}
        </div>
    );
};

export default DetailAppealPage;