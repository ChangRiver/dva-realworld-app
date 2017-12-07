import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Banner from './Banner';
const { Footer, Content } = Layout;

const MainLayout = ({location, children, user}) => {
  return (
    <Layout>
      <Header location={location} user={user}/>
      { (location.pathname !== '/login' && location.pathname !== '/register') && <Banner token={user.token}/> }
      <Layout>
        <Content>{ children }</Content>
      </Layout>
      <Footer className="footer">
        <p>conduit created by dva antd.</p>
      </Footer>
    </Layout>
  )
}

export default MainLayout;
