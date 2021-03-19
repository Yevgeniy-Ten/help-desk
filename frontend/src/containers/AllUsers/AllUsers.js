import React, {useEffect} from "react";
import UsersTable from "../../components/UsersTable/UsersTable";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "./redux/usersAction/usersActions";
import {getUsersState} from "./redux/usersGetters/usersGetters";

const AllUsers = () => {
    const dispatch = useDispatch()
    const {users, isLoading} = useSelector(getUsersState, shallowEqual)
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])
    return (
        <div>
            <UsersTable users={users}/>
        </div>
    );
};

export default AllUsers;
