import React from 'react'
import {Link} from "react-router-dom";
import {Button, Icon} from 'antd';
import {Menu} from 'antd';
import authProvider from "../../common/authorization/authProvider";


export default () => {

    const {isAuthenticated, loginWithRedirect, logout} = authProvider;
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
            <Link to="/">
                <Icon type="home"/>
                <span>Home</span>
            </Link>
            <ShowIf show={!isAuthenticated()}>
                <div
                    onClick={() =>
                        loginWithRedirect({})
                    }>
                    <Icon type="login"/>
                    <span>Login</span>
                </div>
            </ShowIf>
        </Menu.Item>
        <Menu.Item key="2">
            <ShowIf show={isAuthenticated()}>
                <Link to="/collections">
                    <Icon type="database"/>
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
                    <Icon type="logout"/>
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