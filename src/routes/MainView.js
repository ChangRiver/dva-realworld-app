import React from 'react';
import { connect } from 'dva';
import { Tabs, Spin } from 'antd';
import ArticleList from '../components/ArticleList/ArticleList';
const TabPane = Tabs.TabPane;

const MainView = ({ dispatch, loading, token, tag, tabActive }) => {
  
  function handleTabChange(key) {
    if(key === "globalFeed") {
      dispatch({
        type: "article/articlesAll", 
        payload: {
          page: 1,
          tabActive: key
        }
      })
    } else if(key === "yourFeed") {
      dispatch({
        type: "article/articlesFeed",
         payload: {
           page: 1,
           tabActive: key
         }
      })
    } 
  } 
 
  if(loading) {
    return null;
  }
  return (
    <div className="main-content mT50">
      <Tabs activeKey={ tabActive } onChange={handleTabChange}>
        { (token !== null ) && <TabPane tab="YourFeed" key="yourFeed"><ArticleList /></TabPane> }
        <TabPane tab="GlobalFeed" key="globalFeed">
          <ArticleList />
        </TabPane>
        { tag !== null && <TabPane tab={tag} key={tag}><ArticleList /></TabPane> }
      </Tabs>
    </div>
  )
}

function mapStateToProps(state) {
  const { tag, tabActive } = state.article;
  const { token } = state.app;
  return { 
    token,
    tag, 
    tabActive,
    loading: state.loading.models.app
  } 
}

export default connect(mapStateToProps)(MainView);