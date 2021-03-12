import React from "react";
import TablForm from "../UI/TableForm/TableForm";

const AppealList = ({appeals}) => {

    return (
        <TablForm appeals={appeals} />
    );
};

export default AppealList;