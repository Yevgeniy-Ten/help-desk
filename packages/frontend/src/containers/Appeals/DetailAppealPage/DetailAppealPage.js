import React, { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import AppealDetails from "../../../components/AppealDetails/AppealDetails";
import { useParams } from "react-router-dom";
import {
  appealCreateMessage,
  fetchAppeal,
  getAppealChatMessage,
  getAppealChatMessages
} from "../redux/appealActions";
import { getAppealMessages, getAppealState } from "../redux/appealGetters";
import AppealChat from "../AppealChat/AppealChat";

const DetailAppealPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { appeal } = useSelector(getAppealState, shallowEqual);
  const messages = useSelector(getAppealMessages);
  const onCreateChatMessage = (message) => {
    dispatch(appealCreateMessage(message, id));
  };
  // const onCancelAppeal = (id) => {
  //   // как то отзывать заявку
  // };
  useEffect(() => {
    dispatch(fetchAppeal(id));
    dispatch(getAppealChatMessages(id));
    dispatch(getAppealChatMessage(id));
  }, [dispatch, id]);
  return (
    <div style={{ padding: "10px 20px" }}>
      {appeal ? <AppealDetails appeal={appeal} /> : <p>Заявка не найдена</p>}
      {appeal && (
        <AppealChat onCreateMessage={onCreateChatMessage} messages={messages} />
      )}
    </div>
  );
};

export default DetailAppealPage;
