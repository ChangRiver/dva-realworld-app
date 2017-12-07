import React from 'react';
import { connect } from 'dva';
import { List, Avatar, Icon, Tag } from 'antd';
import styles from './ArticleList.css';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    { text }
  </span>
);

const Tags = ({ tagList }) => (
  <div>
    {
      tagList.map((tag, i) => (
        <Tag color="lime" key={i}>{ tag }</Tag>
      ))
    }
  </div>
);

const ArticleList = ({
  dispatch,
  loading,
  tag,
  articles,
  tabActive,
  articlesCount,
  current
}) => {
  if(articles.length === 0) {
    return null;
  }

  function onSetPage(page) {
    if(tabActive === 'globalFeed') {
      dispatch({
        type: 'article/articlesAll', 
        payload: { 
          page: page,
          tabActive: tabActive
        }
      })
    } else if(tabActive === 'yourFeed') {
      dispatch({
        type: 'article/articlesFeed', 
        payload: { 
          page: page,
          tabActive: tabActive
        }
      })
    } else {
      dispatch({
        type: 'article/articlesByTag', 
        payload: { 
          page: page,
          tag: tag
        }
      })
    }
  }

  const pagination = {
    pageSize: 10,
    current: current,
    total: articlesCount,
    onChange: onSetPage
  };

  return (
    <List
        itemLayout="vertical"
        loading={loading}
        pagination={pagination}
        dataSource={articles}
        renderItem={item => (
          <List.Item
            actions={[<IconText type="heart" text={ item.favoritesCount } />, <Tags tagList={ item.tagList }/>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={ item.author.image } />}
              title={<a className={styles.username} href="https://ant.design">{item.author.username}</a>}
              description={<span className={styles.time}>{ item.createdAt.split('.')[0].split('T').join(' ') }</span>}
            />
            <h2>{ item.title }</h2>
            <p>{ item.description }</p>
            <span>Read more...</span>
          </List.Item>
        )}/>
  )
};

function mapStateToProps(state) {
  const { articles, articlesCount, current, tabActive, tag } = state.article;
  return {
    articles,
    current,
    tabActive,
    tag,
    articlesCount,
    loading: state.loading.models.article
  }
}

export default connect(mapStateToProps)(ArticleList);
