import React from "react";
import TableAppeals from "../UI/TableForm/TableAppeals";
import { useDispatch } from "react-redux";
import { saveSelectedAppeals } from "../../containers/Appeals/redux/action/appealsAction";

const AppealList = ({appeals}) => {
    const dispatch = useDispatch();
    
    const saveSelectedAppealsHandler = (appeals) => {
        dispatch(saveSelectedAppeals(appeals));
    };

    return (
        <TableAppeals appeals={appeals} saveSelectedAppealsHandler={saveSelectedAppealsHandler} />
    );
};

export default AppealList;