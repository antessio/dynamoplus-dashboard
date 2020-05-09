import React from 'react'
import {Link} from "react-router-dom";
import {Button, Icon} from 'antd';
import {Menu} from 'antd';
import authProvider from "../../common/authorization/authProvider";


export default () => {

    const {isAuthenticated, loginWithRedirect, logout} = authProvider;
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
            {!isAuthenticated && (
                <div
                    onClick={() =>
                        loginWithRedirect({})
                    }>
                    <Icon type="login"/>
                    <span>Login</span>
                </div>
            )}
            {isAuthenticated &&

            <Link to="/profile">
                <Icon type="user"/>
                <span>Profile</span>
            </Link>
            }
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/collections">
                <Icon type="database"/>
                <span>Collections</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="3">

            {isAuthenticated &&
            <div
                onClick={() =>
                    logout()
                }>
                <Icon type="logout"/>
                <span>Logout</span>
            </div>}
        </Menu.Item>
    </Menu>)
}