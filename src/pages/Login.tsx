import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, message, notification } from 'antd';
import { GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import Header from '../layout/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('https://local-event-planner-backend.onrender.com/user/login/', values);
      console.log('Login successful:', response.data);
      const { access, refresh } = response.data.tokens;
      
      //store tokens in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      
      dispatch(login({ accessToken: access, refreshToken: refresh }));
      notification.open({
        message: 'Login Success',
        placement: 'topRight',
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <Header />
      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
        <Title level={2}>Login</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div>
                <GoogleOutlined style={{ fontSize: '24px', color: '#DB4437' }} />
              </div>
            </Col>
            <Col span={8}>
              <div >
                <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
              </div>
            </Col>
            <Col span={8}>
              <div >
                <GithubOutlined style={{ fontSize: '24px', color: '#333' }} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Login;
