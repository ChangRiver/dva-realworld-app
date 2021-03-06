import React from 'react';
import styles from './MainLayout.css';

const Banner = ({ token }) => {
  if(token) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className="container">
        <h1>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  )
};

export default Banner;
