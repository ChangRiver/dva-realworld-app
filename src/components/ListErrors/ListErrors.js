import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListErrors.css';

const ListErrors = ({ errors }) => {
  if(errors) {
    return (
      <ul className={styles.list_errors}>
        {
          Object.keys(errors).map(key => (
            <li key={ key }>
              { key } { errors[key] }
            </li>
          ))
        }
      </ul>
    )
  } else {
    return null;
  }
}

ListErrors.propTypes = {
  errors: PropTypes.object
}

export default ListErrors;