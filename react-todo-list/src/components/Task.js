import React from 'react';
import TaskArrowsForColumns from './TaskArrowsForColumns';

import styles from './Task.module.css';


// function naming convention
const task = (props) => {

  return (
    <div className={styles.task}>
      <div onClick={props.deleteTask}>closeeee</div>
      <div>Title: {props.title}</div>
      <div>Description: {props.description}</div>
      <TaskArrowsForColumns statusList={props.statusList} status={props.status} moveStatusTask={props.moveStatusTask} />
    </div>
  );
}

export default task;
