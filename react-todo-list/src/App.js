import React, { Component } from 'react';
import ListOfTasks from './components/ListOfTasks'
import styles from './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee)

class App extends Component {
  state = {
    displayTaskForm: false,
    createTaskTitle: '',
    createTaskDesc: '',
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
    ]
  }

  submitHandler = (event) => {
    event.preventDefault();
    alert(1);
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleAddTaskForm = () => {
    const currentValue = this.state.displayTaskForm;
    this.setState({displayTaskForm: !currentValue})
  }

  deleteTaskHandler = (index, status) => {
    // Remember always to create a new copy of the array
    let tempArray = [...this.state[status]]
    tempArray.splice(index, 1);
    this.setState({[status]: tempArray})
  }

  render() {

    let tasksForm = null;
    if (this.state.displayTaskForm) {
      tasksForm = (
        <div>
          <form onSubmit={this.submitHandler}>
            <input name="createTaskTitle" type="text" onChange={this.changeHandler} value={this.state.createTaskTitle} />
            <input name="createTaskDesc"  type="text" onChange={this.changeHandler} value={this.state.createTaskDesc} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }

    return (
      <div className="App">
        <div onClick={this.toggleAddTaskForm}>SHOW FORM missing toogling hide name: show/hide</div>
        {tasksForm}
        <div className={styles.flexGrid}>
          <ListOfTasks status="toDo" deleteTask={this.deleteTaskHandler} tasks={this.state.toDo}>This is what is remaining</ListOfTasks>
          <ListOfTasks status="inProgress" deleteTask={this.deleteTaskHandler} tasks={this.state.inProgress}>This is what is in progress</ListOfTasks>
          <ListOfTasks status="done" deleteTask={this.deleteTaskHandler} tasks={this.state.done}>This is what is done</ListOfTasks>
        </div>
      </div>
    );
  }
}

export default App;
