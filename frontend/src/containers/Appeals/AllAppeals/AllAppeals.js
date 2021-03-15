import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {fetchAppeals} from "../redux/action/appealsAction";
import {getAppealsState} from "../redux/getters/getters";
import AppealList from "../../../components/AppealList/AppealList";
import AppealsFilter from "../../../components/AppealsFilter/AppealsFilter";

const AllAppeals = () => {
    const dispatch = useDispatch();

    const {appeals} = useSelector(getAppealsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchAppeals());
    }, [dispatch]);
    
    return (
        <>
            <AppealsFilter/>
            <AppealList appeals={appeals}/>
        </>
    );
};

export default AllAppeals;