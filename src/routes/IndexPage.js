import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleList from '../components/ArticleList/ArticleList';
import TagList from '../components/TagList/TagList';
import MainView from './MainView';

function IndexPage({ location, user, token, loading }) {
  return (
    <MainLayout location={location} user={user} token={token} loading={loading}>
      <div className="container">
        <Row gutter={16}>
          <Col span={18}>
            <MainView loading={loading} token={token} />
          </Col>
          <Col span={6}>
            <TagList />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  const { user, token } = state.app;
  return { 
    user,
    token,
    loading: state.loading.models.app
  };
}
export default connect(mapStateToProps)(IndexPage);
