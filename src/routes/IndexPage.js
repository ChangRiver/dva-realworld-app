import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleList from '../components/ArticleList/ArticleList';
import TagList from '../components/TagList/TagList';

function IndexPage({ location, user }) {
  return (
    <MainLayout location={location} user={user}>
      <div className="container">
        <Row gutter={16}>
          <Col span={18}>
            <div className="main-content mT50">
              <ArticleList />
            </div>
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
  const { user } = state.app;
  return { user };
}
export default connect(mapStateToProps)(IndexPage);
