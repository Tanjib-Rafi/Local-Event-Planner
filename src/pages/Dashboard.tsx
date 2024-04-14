import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Divider, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const refreshToken = useSelector((state : any) => state.auth.refreshToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            console.log(refreshToken);
            await axios.post('http://0.0.0.0:8001/user/logout/', { refresh: refreshToken });
            dispatch(logout());
            //remove tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ flex: 1, minWidth: 0, marginBottom: '20px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/create-event">Create Event</Link>
                    </Menu.Item>
                    {isLoggedIn ? (
                        <Menu.Item key="3" onClick={handleLogout}>
                            Logout
                        </Menu.Item>
                    ) : (
                        <Menu.Item key="3">
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                    )}
                    {!isLoggedIn && (
                        <Menu.Item key="4">
                            <Link to="/signup">Signup</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User Menu">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} lg={8}>
                                <Card title="Card 1" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={8}>
                                <Card title="Card 2" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={8}>
                                <Card title="Card 3" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} lg={12}>
                                <Card title="Card 4" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={12}>
                                <Card title="Card 5" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
