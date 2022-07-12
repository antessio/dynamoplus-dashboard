import React from 'react'
import {Link} from "react-router-dom";
import {Menu} from 'antd';
import authProvider from "../../common/authorization/authProvider";
import {LogoutOutlined,LoginOutlined,DatabaseOutlined, HomeOutlined} from '@ant-design/icons';

export default () => {

    const {isAuthenticated, loginWithRedirect, logout} = authProvider;
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
            <Link to="/">
                <HomeOutlined />
                <span>Home</span>
            </Link>
            <ShowIf show={!isAuthenticated()}>
                <div
                    onClick={() =>
                        loginWithRedirect({})
                    }>
                    <LoginOutlined />
                    <span>Login</span>
                </div>
            </ShowIf>
        </Menu.Item>
        <Menu.Item key="2">
            <ShowIf show={isAuthenticated()}>
                <Link to="/collections">
                    <DatabaseOutlined />
                    <span>Collections</span>
                </Link>
            </ShowIf>
        </Menu.Item>
        <Menu.Item key="3">
            <ShowIf show={isAuthenticated()}>
                <div
                    onClick={() =>
                        logout()
                    }>
                    <LogoutOutlined />
                    <span>Logout</span>
                </div>
            </ShowIf>
            {/*{isAuthenticated() &&
            <div
                onClick={() =>
                    logout()
                }>
                <Icon type="logout"/>
                <span>Logout</span>
            </div>}*/}
        </Menu.Item>
    </Menu>)
}

class ShowIf extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return this.props.show && this.props.children
    }
}

const showIf = (b, component) => {
    return b && component
}