import ip from "./../serverIp.json"
import React, { useState,useEffect } from "react";
import ModifyTask from "./ModifyTask";
import Popup from 'reactjs-popup';
import UpdateWork from "./UpdateWork";
import UpdateTask from "./UpdateTask";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditTask from "./EditTask";
const Tasks = (option) => {
  const [tasks, SetTasks] = useState([]);
  let history = useHistory();
  var title = option.title
  useEffect(() => {
    apiLoad()
}, [])
  const apiLoad = () => {
    var myHeaders = new Headers();
    
    myHeaders.append("userId", localStorage.userId);
    myHeaders.append("Authorization", "Bearer "+localStorage.JWTToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let uri  = (window.location.href.split("/")[3]==="task-for-today" || window.location.href.split("/")[3]==="tentative-tasks")? "tentative-todo":window.location.href.split("/")[4]
    console.log(window.location.href.split("/")[3],"testin123")
    fetch(ip.serverIp + "/task/"+uri, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(obj => {
        if (obj !== null) {
          SetTasks(obj)
        }
        console.log(window.location.href.split("/")[3],"testin123")
      })
      .catch(error => console.log('error', error));
  }
  function GetButton(task){
    if (option.title === "Modify")
      return (<ModifyTask taskId = {task.taskId}/>)
    else if (option.title === "Update")
      return (<EditTask taskId = {task.taskId}/>)
    else
      return (<UpdateWork taskId = {task.taskId}/>)
      // history.push("/task/work/"+task.taskId)
  }
  const populateTasks = () => {
    console.log(tasks)
    // apiLoad()
    return (tasks.map(function (task, i) {
      task.flow = option.title
      return (<tr>
        <td>{i+1}</td>
        <td>{task.taskName}</td>
        {option.title === "Modify" &&
        <ModifyTask taskId = {task.taskId}/>
      }
      {option.title === "Update / Log Work" &&
       <UpdateTask taskId = {task.taskId}/>
      }
      {option.title === "Update" &&
        <ModifyTask taskId = {task}/>
      }
      </tr>)
    }))

  }
  const table=()=>{
    return(
    <table className="table-auto border-blue-200   indent-[10px] font-semibold text-center w-[445px] h-[40px] mt-[100px] left-[500px] sticky">
      <thead>
        <tr>
          <th className="bg-blue-200">S.No</th>
          <th className="bg-blue-200">Task</th>
          <th className="bg-blue-200">{title}</th>
        </tr>
      </thead>
      <tbody>
        {populateTasks()}
      </tbody>
    </table>)
  }

  return (
    table()
      )
}

export default Tasks;
