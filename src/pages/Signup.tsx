import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import Header from '../layout/Header';
import axios from 'axios';

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post('http://0.0.0.0:8001/user/signup/', {
        user_name: values.username,
        email: values.email,
        password: values.password
      });
      console.log('Signup successful');
      setLoading(false);
      showSuccessNotification();
      navigate('/dashboard'); 
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const showSuccessNotification = () => {
    notification.success({
      message: 'Account Created',
      description: 'Your account has been created successfully.',
      placement: 'topRight',
    });
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
        <Title level={2}>Sign Up</Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input />
          </Form.Item>
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
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <GoogleOutlined style={{ fontSize: '24px', color: '#DB4437', marginRight: '8px' }} />
          <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998', marginRight: '8px' }} />
          <GithubOutlined style={{ fontSize: '24px', color: '#333' }} />
        </div>
      </div>
    </>
  );
};

export default Signup;
