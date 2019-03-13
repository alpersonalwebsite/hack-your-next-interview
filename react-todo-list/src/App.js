import React, { Component } from 'react';
import ListOfTasks from './components/ListOfTasks'
import styles from './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee)

class App extends Component {
  state = {
    createTaskTitle: '',
    createTaskDesc: '',
    toDo: [
      { title: 'Title 1...', description: 'Description 1...' },
      { title: 'Title 2...', description: 'Description 2...' },
      { title: 'Title 3...', description: 'Description 3...' }
    ],
    inProgress: [],
    done: []
  }

  submitHandler = (event) => {
    event.preventDefault();
    alert(1);
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <div>
          <form onSubmit={this.submitHandler.bind(this)}>
            <input name="createTaskTitle" type="text" onChange={this.changeHandler.bind(this)} value={this.state.createTaskTitle} />
            <input name="createTaskDesc"  type="text" onChange={this.changeHandler.bind(this)} value={this.state.createTaskDesc} />
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className={styles.flexGrid}>
          <ListOfTasks tasks={this.state.toDo}>This is what is remaining</ListOfTasks>
          <ListOfTasks tasks={this.state.toDo}>This is what is in progress</ListOfTasks>
          <ListOfTasks tasks={this.state.toDo}>This is what is done</ListOfTasks>
        </div>
      </div>
    );
  }
}

export default App;
