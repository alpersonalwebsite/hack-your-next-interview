import React from 'react';
import Task from './Task';
import styles from './ListOfTasks.module.css'

const listOfTasks = (props) => {
  return (
      <div className={styles.col}>
        <div>{props.children}</div>
        {props.tasks.map(({title, description}) => <Task key={title} title={title} description={description} />)}
      </div>
  )
}

export default listOfTasks;
