import React from 'react';
import { Link } from 'dva/router';
import { Avatar } from 'antd';
import styles from './ArticleMeta.css';

const ArticleMeta = ({ article }) => (
  <div className={styles.article_meta}>
    <Link to={`/profile@${article.author.username}`}><Avatar className={styles.avatar} src={ article.author.image } /></Link>
    <div className={styles.info}>
      <Link to={`/profile@${article.author.username}`}>{ article.author.username }</Link>
      <span className={styles.date}>
        {new Date(article.createdAt).toDateString()}
      </span>
    </div>
  </div>
)

export default ArticleMeta;