import React from 'react';
import { Button } from 'antd';

const FollowUserButton = ({username, following, follow, unfollow, followLoading}) => {
  function handleClick(e) {
    e.preventDefault();
    if(following) {
      unfollow(username)
    } else {
      follow(username)
    }
  }

  return (
    <Button 
      icon="plus" 
      className="pull_right" 
      loading={followLoading}
      onClick={handleClick}>
      { following ? 'Unfollow' : 'Follow' } {username}
    </Button>
  )
}

export default FollowUserButton;
