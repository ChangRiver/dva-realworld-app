import React from 'react';
import { connect } from 'dva';
import { Row, Col, Spin, Tag } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import ArticleMeta from '../../components/ArticleMeta/ArticleMeta';
import CommentContainer from './CommentContainer';
import styles from './ArticleDetail.css';

function ArticleDetail({ location, loading, article, comments, user }) {
  return (
    <MainLayout location={location}>
      <div className="container">
        {
          loading ? <Spin /> : 
          <Row>
            <Col span={24}>
              <div className={styles.articleDetail}>
                <div className={styles.header}>
                  <h1>{ article.title }</h1>
                  <ArticleMeta article={article} />
                </div> 
                <div className={styles.content}>
                  <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
                  <ul className={styles.tagList}>
                    {
                      article.tagList.map(tag => (
                        <Tag key={tag} color="lime">{ tag }</Tag>
                      ))
                    }
                  </ul>
                </div>
                <CommentContainer currentUser={user} slug={ article.slug } comments={comments} />
              </div>
            </Col>
          </Row>
        }
      </div>
    </MainLayout>
  )
}

function mapStateToProps(state) {
  const { article, comments } = state.articleDetail;
  const { user } = state.app;
  const loading = state.loading.effects['articleDetail/getComments'] || state.loading.effects['articleDetail/getDetail'];
  return {
    user,
    article,
    comments,
    loading: loading
  }
}
export default connect(mapStateToProps)(ArticleDetail);