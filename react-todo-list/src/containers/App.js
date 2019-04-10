import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import ListOfTasks from '../components/ListOfTasks';
import HeaderNav from '../components/HeaderNav';
import styles from './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleRight, 
  faArrowAltCircleLeft, 
  faTrashAlt,
  faCoffee, faAdjust } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowAltCircleRight, 
  faArrowAltCircleLeft, 
  faCoffee, 
  faAdjust, 
  faTrashAlt)

/*
I´m using solid and free 
https://fontawesome.com/icons?d=gallery&s=solid&m=free

Example usage:
In the module or component... import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Then: <FontAwesomeIcon icon="trash-alt" />
*/

class App extends Component {
  state = {
    displayTaskForm: false,
    createTaskTitle: '',
    createTaskDesc: '',
    listOfStatus: ['toDo', 'inProgress', 'done'],
    toDo: [
      { id: '1', title: 'Title 1...', description: 'Description 1...' },
      { id: '2', title: 'Title 2...', description: 'Description 2...' },
      { id: '3', title: 'Title 3...', description: 'Description 3...' }
    ],
    inProgress: [
      { id: '4', title: 'Title 4...', description: 'Description 4...' },
      { id: '5', title: 'Title 5...', description: 'Description 5...' }
    ],
    done: [
      { id: '6', title: 'Title 6...', description: 'Description 6...' }
    ],
    selectedTask: ''
  }


  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleAddTaskForm = () => {
    const currentValue = this.state.displayTaskForm;
    this.setState({displayTaskForm: !currentValue})
  }

  // working onSubmit
  // we suppose that we always add to toDo
  addTaskHandler = (event) => {
    event.preventDefault();
    let tempObject = {};
    tempObject.id = uuidv1();
    tempObject.title = this.state.createTaskTitle;
    tempObject.description = this.state.createTaskDesc;
    this.setState({
      createTaskTitle: '',
      createTaskDesc: '',
      toDo: [...this.state.toDo, tempObject]
    })
  }

  deleteTaskHandler = (index, status) => {
    // Remember always to create a new copy of the array
    let tempArray = [...this.state[status]]
    tempArray.splice(index, 1);
    this.setState({[status]: tempArray})
  }

  moveStatusTaskHandler = (index, status, leftOrRight) => {
    // Remember always to create a new copy of the array
    let tempArray = [...this.state[status]];

    // delete from x-status
    let removedArray = tempArray.splice(index, 1);

    //leftOrRight could be "right" or "left"
    const statusList = this.state.listOfStatus;
    const newColumnStatus = leftOrRight === 'right' ? statusList[statusList.indexOf(status) + 1] : statusList[statusList.indexOf(status) - 1] ;

    //add to x-status
    this.setState({
      [status]: tempArray,
      [newColumnStatus]: [...this.state[newColumnStatus], removedArray[0]]
    });
  }

  selectTaskHandler = (id, status) => {
    console.log('Selected!', id, status)
  }

  render() {

    let tasksForm = null;
    if (this.state.displayTaskForm) {
      tasksForm = (
        <div>
          <form onSubmit={this.addTaskHandler}>
            <input name="createTaskTitle" type="text" onChange={this.changeHandler} value={this.state.createTaskTitle} />
            <input name="createTaskDesc"  type="text" onChange={this.changeHandler} value={this.state.createTaskDesc} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Board</h1>
        <HeaderNav />
        <div onClick={this.toggleAddTaskForm}>SHOW FORM missing toogling hide name: show/hide</div>
        {tasksForm}
        <div className={styles.flexGrid}>
          <ListOfTasks 
            status="toDo" 
            moveStatusTask={this.moveStatusTaskHandler}
            statusList={this.state.listOfStatus} 
            deleteTask={this.deleteTaskHandler} 
            selectTask={this.selectTaskHandler}
            tasks={this.state.toDo}>TO DO
          </ListOfTasks>

          <ListOfTasks 
            status="inProgress" 
            moveStatusTask={this.moveStatusTaskHandler}
            statusList={this.state.listOfStatus} 
            deleteTask={this.deleteTaskHandler} 
            selectTask={this.selectTaskHandler}
            tasks={this.state.inProgress}>IN PROGRESS
          </ListOfTasks>

          <ListOfTasks 
            status="done" 
            moveStatusTask={this.moveStatusTaskHandler}
            statusList={this.state.listOfStatus} 
            deleteTask={this.deleteTaskHandler} 
            selectTask={this.selectTaskHandler}
            tasks={this.state.done}>DONE
          </ListOfTasks>
        </div>
      </div>
    );
  }
}

export default App;
