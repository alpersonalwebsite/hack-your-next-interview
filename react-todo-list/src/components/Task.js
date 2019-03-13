import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Task.module.css';


// function naming convention
const task = (props) => {

let arrowsForColumn = null;
if (props.statusList.indexOf(props.status) === 0) {
  arrowsForColumn = (
    <div className={styles.arrowsRow}><span></span><span>{props.status}</span><span onClick={props.moveStatusTask.bind(this, 'right')}>Right</span></div>
  );
} else if (props.statusList.indexOf(props.status) === props.statusList.length -1) {
  arrowsForColumn = (
    <div className={styles.arrowsRow}><span>Left</span><span>{props.status}</span><span></span></div>
  );
} else {
    arrowsForColumn = (
      <div className={styles.arrowsRow}><span>Left</span><span>{props.status}</span><span>Right</span></div>
    );
}

  return (
    <div className={styles.task}>
      <div onClick={props.deleteTask}>closeeee</div>
      <div>Title: {props.title}</div>
      <div>Description: {props.description}</div>
      <div>{arrowsForColumn}</div>
    </div>
  );
}

export default task;
