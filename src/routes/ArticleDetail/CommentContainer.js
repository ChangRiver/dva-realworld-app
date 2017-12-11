import React from 'react';
import { Link } from 'dva/router';
import { Row, Col } from 'antd';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import styles from './ArticleDetail.css';

const CommentContainer = ({comments, currentUser, slug}) => {
  if(currentUser.username) {
    return (
      <Row>
        <Col span={14} offset={5}>
          <div className="mT20">
            <CommentInput slug={slug} currentUser={currentUser} />
          </div>
          <CommentList comments={comments} />
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col span={14} offset={5}>
        <p className={styles.txt}>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">Sign up</Link>
          &nbsp;to add comments on this article.
        </p>
        <CommentList comments={comments} />
      </Col>
    </Row>
  )
}

export default CommentContainer;