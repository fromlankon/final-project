import React, { useState } from 'react';
import { AppstoreOutlined, SlackOutlined, CompassOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from './components/Admin Header/AdminHeader';
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link to={"dashboard"}> Dashboard </Link>, '1', <AppstoreOutlined />),
    getItem("Catalog", 'sub2', <SlackOutlined />, [getItem(<Link to={"products"}> Products </Link>, '6'), getItem(<Link to={"brands"}> Brands </Link>, '8')]),
    getItem(<Link to={"orders"}> Orders </Link>, '2', <CompassOutlined />),
    getItem(<Link to={"users"}> Users </Link>, '9', <TeamOutlined />),
];

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ userSelect: "none" }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{padding: "0 60px"}}>
                    <AdminHeader />
                </Header>
                <Content style={{ margin: '0 16px' }} >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};