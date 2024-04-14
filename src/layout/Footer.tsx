import React from 'react';
import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter style={{ textAlign: 'center' }}>
      Local Event Planner
    </AntdFooter>
  );
};

export default Footer;
