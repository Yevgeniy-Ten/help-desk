import React, {useEffect} from "react";
import UsersTable from "../../components/UsersTable/UsersTable";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchAllUsers, fetchAuthorizeUser} from "./redux/usersAction/usersActions";
import {getUsersState} from "./redux/usersGetters/usersGetters";
import Spinner from "../../components/Spinner/Spinner";

const AllUsers = () => {
    const dispatch = useDispatch()
    const {users, isLoading} = useSelector(getUsersState, shallowEqual)
    const onAuthorizeUser = (id) => dispatch(fetchAuthorizeUser(id))
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])
    return (
        <div style={{padding: "10px 20px"}}>
            {isLoading ? <Spinner/> : <UsersTable onAuthorizeUser={onAuthorizeUser} users={users}/>}
        </div>
    );
};

export default AllUsers;
