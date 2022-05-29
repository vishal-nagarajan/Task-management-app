import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from './view/Register';
import TentativeTodo from './view/TentativeToDo'
import SignIn from './view/SignIn';
import TaskForTheDay from './view/TaskForTheDay';
import Tasks from './view/Tasks';
import AddTask from './view/AddTask';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './view/NavBar';
import Landing from './view/Landing';
import UpdateWork from './view/UpdateWork';
import CompletedTasks from './view/TaskListViews/CompletedTasks';
import WorkLog from './view/WorkLog';
import EditTask from './view/EditTask';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="app-container">
        {/* <NavBar/> */}
        <Switch>
        <Route path="/homepage" component={Landing} />
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={SignIn} />
          <Route path="/tentative-tasks" component={TentativeTodo} />
          <Route path="/task-for-today" component={TaskForTheDay} />
          <Route path="/task/work/:taskId" component={UpdateWork} />
          <Route path="/task/completed" component={CompletedTasks} />
          <Route path='/task/task-in-progress' component={CompletedTasks} />
          <Route path='/task/task-over-due' component={CompletedTasks} />
          <Route path='/task/all' component={CompletedTasks} />
          <Route path='/task/task-yet-to-be-due' component={CompletedTasks} />
          <Route path='/task/work-log' component={WorkLog} />
          <Route path='/task/edit/:taskId' component={EditTask} />
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
