import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUserForUpdate } from "./redux/usersAction/usersActions";
import { getUserForUpdateState } from "./redux/usersGetters/usersGetters";
import Spinner from "../../components/Spinner/Spinner";
import UserDetails from "../../components/UserDetails/UserDetails";
import { fetchCompanies } from "../Settings/redux/settingsActions";
import { getCompanies } from "../Settings/redux/settingGetters";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userForUpdate, isLoading } = useSelector(
    getUserForUpdateState,
    shallowEqual
  );
  console.log(isLoading, "isLoading")
  const companies = useSelector(getCompanies)
  useEffect(() => {
    dispatch(fetchUserForUpdate(id));
    dispatch(fetchCompanies())
  }, [dispatch, id]);
  return (
    <div>
      {!isLoading ? <Spinner /> : <UserDetails userInfo={userForUpdate} companies={companies} />}
    </div>
  );
};

export default EditUser;
