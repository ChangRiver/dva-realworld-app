import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import styles from './MainLayout.css';

const Header = ({ location }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.logo}>conduit</div>
        <Menu className="pull_right" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/"><Icon type="home" />Home</Link>
          </Menu.Item>
          <Menu.Item key="/login">
            <Link to="/login">Sign in</Link>
          </Menu.Item>
          <Menu.Item key="/register">
            <Link to="/register">Sign up</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Header;
