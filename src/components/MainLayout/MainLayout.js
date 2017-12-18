import React from 'react';
import { connect } from 'dva';
import { Layout, Spin } from 'antd';
import Header from './Header';
import Banner from './Banner';
const { Footer, Content } = Layout;

const MainLayout = ({location, children, user, token, loading}) => {
  const reg = /\/article\/(.*)/;
  const isArticleDetailPage = reg.test(location.pathname);
  return (
    <Layout>
      <Header location={location} token={token} user={user}/>
      {
        (() => {
          if(location.pathname !== '/login' && location.pathname !== '/register' && !isArticleDetailPage) {
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

function mapStateToProps(state) {
  const { user, token } = state.app;
  return { 
    user,
    token,
    loading: state.loading.models.app
  };
}

export default connect(mapStateToProps)(MainLayout);
