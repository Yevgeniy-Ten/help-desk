import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch} from "react-redux";
import Routes from "../../Routes/Routes";
import {useToggle} from "../../hooks/useToggle";
import {getUser} from "../Auth/redux/actions/usersActions";
import MenuSider from "../../components/MenuSider/MenuSider";
import AppHeader from "../Header/Header";

const {Sider, Content} = Layout;

const App = () => {
    const [sideIsShowed, toggleSideIsShow] = useToggle();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    return (
        <>
            {/*{Object.values(errors).some((element) => element !== null) ? (*/}
            {/*    <ErrorHandler errors={errors}/>*/}
            {/*) : null}*/}
            <Layout>
                <AppHeader onShowSider={toggleSideIsShow} sideIsShow={sideIsShowed}/>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={sideIsShowed}
                        onCollapse={toggleSideIsShow}
                        style={{minHeight: "100vh"}}
                    >
                        <MenuSider/>
                    </Sider>
                    <Content>
                        <Routes/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default App;
