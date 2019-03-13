import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Task.module.css';


// function naming convention
const task = (props) => {
  return (
    <div className={styles.task}>
      <div onClick={props.deleteTask}>closeeee</div>
      <div>Title: {props.title}</div>
      <div>Description: {props.description}</div>
      <div>
        <span>arrow icons</span>
        <span>status</span>
      </div>
    </div>
  );
}

export default task;
