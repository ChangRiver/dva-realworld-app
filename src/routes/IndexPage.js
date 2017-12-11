import React from 'react';
import { Row, Col } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleList from '../components/ArticleList/ArticleList';
import TagList from '../components/TagList/TagList';
import MainView from './MainView';

function IndexPage({ location}) {
  return (
    <MainLayout location={location}>
      <div className="container">
        <Row gutter={16}>
          <Col span={18}>
            <MainView />
          </Col>
          <Col span={6}>
            <TagList />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default IndexPage;
