import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import axios from 'axios';

const { Header } = Layout;

const Navbar = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log(refreshToken);
      await axios.post('https://local-event-planner-backend.onrender.com//user/logout/', { refresh: refreshToken });
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
    <Layout>
      <Header style={{ background: '#fff', display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, minWidth: 0, marginBottom: "20px" }}
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
    </Layout>
  );
};

export default Navbar;
