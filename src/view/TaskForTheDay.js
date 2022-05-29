import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, fasUserPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import AddTask from "./AddTask.js"
import Tasks from "./Tasks"
import ip  from "./../serverIp.json"
import Popup from 'reactjs-popup';
import NavBar from "./NavBar.js";
const TaskForTheDay = () => {
    
    
    return (
        <div>
            <NavBar/>
            <h1 className="text-6xl  text-sky-500 text-center font-bold">Tasks for the day</h1>
            {/* <AddTask/> */}
            {/* <React.StrictMode> */}
            {/* <Popup trigger={<button className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-[42px] ml-[950px] fixed">&nbsp;Create New Task&nbsp;</button>}  >
                <AddTask/>
            </Popup> */}
              <Tasks title='Update / Log Work'/>
                <AddTask/>
               
            {/* </React.StrictMode> */}
           
        </div>
    );
}
export default TaskForTheDay;