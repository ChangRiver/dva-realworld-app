import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon, Avatar } from 'antd';
import styles from './MainLayout.css';

const Header = ({ location, user, token }) => {
  if(token === null) {
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

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.logo}>conduit</div>
        <Menu className="pull_right" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/"><Icon type="home" />Home</Link>
          </Menu.Item>
          <Menu.Item key="/editor">
            <Link to="/editor"><Icon type="edit" />New Post</Link>
          </Menu.Item>
          <Menu.Item key="/settings">
            <Link to="/settings"><Icon type="setting"/>Settings</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">
              <Avatar className={styles.avatar} size="small" src={user.image} />
              { user.username }
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Header;
