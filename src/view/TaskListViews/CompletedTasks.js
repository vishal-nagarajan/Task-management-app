import ip from "../../serverIp.json"
import React, { useState,useEffect } from "react";
import ModifyTask from "../ModifyTask";
import Popup from 'reactjs-popup';
import UpdateWork from "../UpdateWork";
import UpdateTask from "../UpdateTask";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
const CompletedTasks = (option) => {
    console.log(option,"options")
    const mapValueToHeader = {
        "/task/task-yet-to-be-due":"Tasks yet to be due",
        "/task/completed":"Completed Tasks",
        "/task/task-in-progress":"Tasks in progress",
        "/task/task-over-due":"Tasks over due",
        "/task/all":"All Tasks"
    }

    return (
        <div>
            <NavBar/>
            <h1 className="text-6xl  text-sky-500 text-center font-bold">{mapValueToHeader[option.location.pathname]}</h1>
            {/* {option} */}
            <Tasks title = 'Update'/>
        </div>
    );
}

export default CompletedTasks;
