import React from 'react';
import { Link } from 'dva/router';
import { Avatar } from 'antd';
import styles from './ArticleMeta.css';

const ArticleMeta = ({ article }) => (
  <div className={styles.article_meta}>
    <Avatar className={styles.avatar} src={ article.author.image } />
    <div className={styles.info}>
      <a href="">{ article.author.username }</a>
      <span className={styles.date}>
        {new Date(article.createdAt).toDateString()}
      </span>
    </div>
  </div>
)

export default ArticleMeta;