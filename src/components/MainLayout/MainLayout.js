import React from 'react';
import { Layout, Spin } from 'antd';
import Header from './Header';
import Banner from './Banner';
const { Footer, Content } = Layout;

const MainLayout = ({location, children, user, token, loading}) => {
  return (
    <Layout>
      <Header location={location} token={token} user={user}/>
      {
        (() => {
          if(location.pathname !== '/login' && location.pathname !== '/register') {
            if(loading) {
              return <div className="container"><Spin /></div>
            } else {
              return <Banner token={token}/>
            }
          }else {
            return null
          }
        })()
      }
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
