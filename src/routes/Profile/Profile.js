import React from 'react';
import {connect} from 'dva';
import { Row, Col, Button, Spin } from 'antd';
import styles from './Profile.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import ArticleTabs from './ArticleTabs';
import FollowUserButton from './FollowUserButton';

const Profile = ({
  dispatch,
  history,
  location,
  loading,
  profile,
  user,
  followLoading
}) => {
  const reg = /\/profile@(.+)/;
  const author = reg.exec(location.pathname)[1];
  function handleClick(e) {
    e.preventDefault();
    history.push('/settings')
  }

  function onFollow(username) {
    dispatch({
      type: 'profile/follow',
      payload: { username }
    })
  }

  function onUnfollow(username) {
    dispatch({
      type: 'profile/unfollow',
      payload: { username }
    })
  }

  return (
    <MainLayout location={location}>
      <div className="container">
        <Row>
          <Col span={24}>
            <div className={styles.profile_page}>
              {
                loading ? <Spin/> :
                <div className={styles.profile_info}>
                  <img className={styles.avatar} src={profile.image} />
                  <h4 className={styles.username}>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  {
                    user.username === author ?
                    <Button
                      icon="setting"
                      className={styles.setting_btn}
                      onClick={handleClick}>
                      Edit Profile Settings
                    </Button>
                    : <FollowUserButton
                        followLoading={followLoading}
                        follow={onFollow}
                        unfollow={onUnfollow}
                        username={profile.username}
                        following={profile.following} />
                  }
                </div>
              }
              <ArticleTabs author={author} />
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
};

function mapStateToProps(state) {
  const { profile } = state.profile;
  const { user } = state.app;
  const loading = state.loading.effects['profile/get'];
  const followLoading = state.loading.effects['profile/follow'] || state.loading.effects['profile/unfollow'];
  return {
    user,
    profile,
    loading,
    followLoading
  }
}
export default connect(mapStateToProps)(Profile);
