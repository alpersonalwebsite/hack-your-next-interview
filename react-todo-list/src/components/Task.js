import React from 'react';
import TaskArrowsForColumns from './TaskArrowsForColumns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Task.module.css';


// function naming convention
const task = (props) => {

  const classesForTaskArr = [styles.task];
  classesForTaskArr.push('something');

  // convert to string
  const classesForTaskString = classesForTaskArr.join(' ');


  return (
    <div className={classesForTaskString}
      onClick={props.selectTask} 
      style={{backgroundColor: 'lavender'}}>
      <div className={styles.arrowsWidth16}
        onClick={props.deleteTask}>
         <FontAwesomeIcon icon="trash-alt" />
      </div>
      <div>Title: {props.title}</div>
      <div>Description: {props.description}</div>
      <TaskArrowsForColumns 
        statusList={props.statusList} 
        status={props.status} 
        moveStatusTask={props.moveStatusTask} />
    </div>
  );
}

export default task;
