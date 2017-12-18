import React from 'react';
import {connect} from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Button, Modal } from 'antd';
import styles from './ArticleMeta.css';
const confirm = Modal.confirm;

const ArticleActions = ({dispatch, slug, history}) => {
  function showConfirm() {
    confirm({
      title: 'Do you want to delete this article?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        dispatch({
          type: 'articleDetail/delArticle',
          payload: { 
            slug: slug
          }
        })
      },
      onCancel() {

      }
    })
  }

  function handleClick(e) {
    e.preventDefault();
    const url = `/editor/${slug}`;
    dispatch(routerRedux.push(url));
    dispatch({
      type: 'articleDetail/getDetail',
      payload: slug
    });
    dispatch({type: 'articleEditor/articleUpdateLoad'})
  }

  return (
    <div className={styles.articleActions}>
      <Button ghost icon="edit" onClick={handleClick}>Edit Article</Button>
      <Button ghost type="danger" icon="delete" onClick={showConfirm}>Delete Article</Button>
    </div>
  )
};

export default connect()(ArticleActions);
