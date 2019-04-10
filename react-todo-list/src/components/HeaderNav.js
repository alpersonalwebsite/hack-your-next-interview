import React from 'react';
import styles from './HeaderNav.module.css';

const headerNav = (props) => {
  return (
    <div className={styles.bar}>
      <input />
      <div>Create Task</div>
      <div>Filter</div>
    </div>
  );
}

export default headerNav;
