import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Avatar, Icon, Tag } from 'antd';
import styles from './ArticleList.css';

const IconText = ({ favorited, text, ...props }) => (
  <span className={styles.heart_color}>
    <Icon {...props} type={ favorited ? "heart" : "heart-o" } style={{ marginRight: 8, color: '#5CB85C' }} />
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
  author,
  articles,
  tabActive,
  articlesCount,
  current
}) => {
  function onSetPage(page) {
    if(tabActive === 'globalFeed') {
      dispatch({
        type: 'article/articlesAll', 
        payload: { 
          page: page
        }
      })
    } else if(tabActive === 'yourFeed') {
      dispatch({
        type: 'article/articlesFeed', 
        payload: { 
          page: page
        }
      })
    } else if(tabActive === 'myArticles') {
      dispatch({
        type: 'article/articlesByAuthor',
        payload: { 
          page: 1,
          author: author
        }
      })
    } else if(tabActive === 'favoritedArticles') {
      dispatch({
        type: 'article/favoritedArticles',
        payload: { 
          page: 1,
          author: author
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

  function handleClick(favorited, slug , e) {
    e.preventDefault();
    if(favorited === false) {
      dispatch({type: 'article/favorite', payload: slug})
    } else {
      dispatch({type: 'article/unFavorite', payload: slug})
    }
  }

  const pagination = {
    pageSize: 10,
    current: current,
    total: articlesCount,
    onChange: onSetPage
  };

  if(!loading && articles.length === 0) {
    return <div>No articles are here...yet.</div>
  }

  return (
    <List
        itemLayout="vertical"
        loading={loading}
        pagination={pagination}
        dataSource={articles}
        renderItem={item => (
          <List.Item
            actions={[<IconText favorited={item.favorited} text={ item.favoritesCount } onClick={handleClick.bind(this, item.favorited, item.slug)} />, <Tags tagList={ item.tagList }/>]}
          >
            <List.Item.Meta
              avatar={<Link to={`/profile@${item.author.username}`}><Avatar src={ item.author.image }/></Link>}
              title={<Link className={styles.username} to={`/profile@${item.author.username}`}>{item.author.username}</Link>}
              description={<span className={styles.time}>{ item.createdAt.split('.')[0].split('T').join(' ') }</span>}
            />
            <Link to={`/article/${item.slug}`} className={styles.article_link}>
              <h2>{ item.title }</h2>
              <p>{ item.description }</p>
              <span>Read more...</span>
            </Link>
          </List.Item>
        )}/>
  )
};

function mapStateToProps(state) {
  const { articles, articlesCount, current, tabActive, tag } = state.article;
  const loading = state.loading.effects['article/articlesAll'] || 
                  state.loading.effects['article/articlesFeed'] || 
                  state.loading.effects['article/articlesByTag'] ||
                  state.loading.effects['article/articleLoad'] ||
                  state.loading.effects['article/articlesByAuthor'] ||
                  state.loading.effects['article/favoritedArticles'];
  return {
    articles,
    current,
    tabActive,
    tag,
    articlesCount,
    loading: loading
  }
}

export default connect(mapStateToProps)(ArticleList);
