import React from 'react';
import { List, Avatar } from 'antd';

const CommentList = ({comments}) => {
  return (
    <List 
      itemLayout="horizontal" 
      dataSource={comments}
      renderItem={comment => (
        <List.Item>
          <List.Item.Meta 
            title={comment.author.username} 
            description={<span>{ new Date(comment.createdAt).toDateString() }</span>}
            avatar={<Avatar src={comment.author.image} />} />
          <p>{ comment.body }</p>
        </List.Item>  
      )} />
  )
}

export default CommentList;