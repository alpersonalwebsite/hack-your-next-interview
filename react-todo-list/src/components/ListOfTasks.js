import React from 'react';
import Task from './Task';
import styles from './ListOfTasks.module.css'

const listOfTasks = (props) => {
  return (
      <div className={styles.col}>
        <div>{props.children}</div>
        {props.tasks.map(({id, title, description}, index) =>
          <Task statusList={props.statusList} status={props.status}
          moveStatusTask={(leftOrRight) => props.moveStatusTask(index, props.status, leftOrRight)}
          deleteTask={() => props.deleteTask(index, props.status)}
          key={id} title={title} description={description} />
          )
        }
      </div>
  )
}

export default listOfTasks;
