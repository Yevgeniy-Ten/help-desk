import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUsersState } from "./redux/usersGetters/usersGetters";
import {
  fetchAllUsers,
  fetchAuthorizeUser
} from "./redux/usersAction/usersActions";
import { getCompanies } from "../Settings/redux/settingGetters";
import { fetchSettings } from "../Settings/redux/settingsActions";

import Spinner from "../../components/Spinner/Spinner";
import UsersTable from "../../components/Tables/UsersTable/UsersTable";

const UserTableContainer = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector(getUsersState, shallowEqual);
  const companies = useSelector(getCompanies);
  const onAuthorizeUser = (id) => {
    return dispatch(fetchAuthorizeUser(id));
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchSettings("companies"));
  }, [dispatch]);
  return (
    <div style={{ padding: "10px 20px" }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* <NavLink to="/users/create">
            <Button>Создать пользователя</Button>
          </NavLink> */}

          <UsersTable
            onAuthorizeUser={onAuthorizeUser}
            users={users}
            companies={companies}
          />
        </>
      )}
    </div>
  );
};

export default UserTableContainer;
