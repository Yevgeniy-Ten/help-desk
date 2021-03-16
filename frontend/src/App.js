import React, { useEffect } from "react";
import { Layout } from "antd";
import { useToggle } from "./hooks/useToggle";
import AppHeader from "./components/Header/Header";
import MenuSider from "./components/MenuSider/MenuSider";
import Routes from "./Routes/Routes";
import { getUser } from "./containers/Auth/redux/actions/usersActions";
import ErrorHandler from "./containers/ErrorHandler/ErrorHandler";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getErrorsState } from "./containers/ErrorHandler/redux/getters/getters";
const { Sider, Content } = Layout;

function App() {
  const [sideIsShowed, toggleSideIsShow] = useToggle();
  const dispatch = useDispatch();
  const errors = useSelector(getErrorsState);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      {Object.values(errors).some((element) => element !== null) ? (
        <ErrorHandler errors={errors} />
      ) : null}
      <Layout>
        <AppHeader onShowSider={toggleSideIsShow} sideIsShow={sideIsShowed} />
        <Layout>
          <Sider
            collapsible
            collapsed={sideIsShowed}
            onCollapse={toggleSideIsShow}
            style={{ minHeight: "100vh" }}
          >
            <MenuSider />
          </Sider>
          <Content>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
