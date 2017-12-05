import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Banner from './Banner';
const { Footer, Sider, Content } = Layout;

const MainLayout = ({location, children}) => {
  return (
    <Layout>
      <Header location={location} />
      { (location.pathname !== '/login' && location.pathname !== '/register') && <Banner/> }
      <Layout>
        <Content>{ children }</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default MainLayout;