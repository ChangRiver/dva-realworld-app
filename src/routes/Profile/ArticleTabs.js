import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import ArticleList from '../../components/ArticleList/ArticleList';
const TabPane = Tabs.TabPane;

const ArticleTabs = ({dispatch, tabActive, author}) => {

  function handleTabChange(key) {
    dispatch({
      type: "article/changeTab",
      payload: { tabActive: key } 
    })

    if(key === "myArticles") {
      dispatch({
        type: "article/articlesByAuthor", 
        payload: {
          page: 1,
          author: author
        }
      })
    } else if(key === "favoritedArticles") {
      dispatch({
        type: "article/favoritedArticles",
         payload: {
           page: 1,
           author: author
         }
      })
    } 
  } 

  return (
    <div className="articleTabs mT10">
      <Tabs activeKey={tabActive} onChange={handleTabChange}>
        <TabPane tab="My Articles" key="myArticles">
          <ArticleList author={author} />
        </TabPane>
        <TabPane tab="Favorited Articles" key="favoritedArticles">
          <ArticleList author={author} />
        </TabPane>
      </Tabs>
    </div>
  )
};

function mapStateToProps(state) {
  const { tabActive } = state.article;
  return { tabActive }
}
export default connect(mapStateToProps)(ArticleTabs);
