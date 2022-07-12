import React from "react";
import  { Layout } from 'antd';

import './Layout.css'

import Logo from '../logo/Logo'
import Menu from '../menu/Menu'

import {MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{minHeight: "100vh"}}>
        <Layout.Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Logo />
            <Menu />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }}>

            {this.state.collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
          </Layout.Header>
          <Layout.Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff'
            }}
          >
            {this.props.children}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;