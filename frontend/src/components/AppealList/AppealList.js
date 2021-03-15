import React from "react";
import TablForm from "../UI/TableForm/TableForm";
import { useDispatch } from "react-redux";
import { saveSelectedAppeals } from "../../containers/Appeals/redux/action/appealsAction";

const AppealList = ({appeals}) => {
    const dispatch = useDispatch();
    
    const saveSelectedAppealsHandler = (appeals) => {
        console.log(appeals);
        dispatch(saveSelectedAppeals(appeals));
    };

    return (
        <TablForm appeals={appeals} saveSelectedAppealsHandler={saveSelectedAppealsHandler} />
    );
};

export default AppealList;