import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, fasUserPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import AddTask from "./AddTask.js"
import Tasks from "./Tasks"
import ip  from "./../serverIp.json"
import Popup from 'reactjs-popup';
import NavBar from "./NavBar.js";
const TentativeTodo = () => {
    let history = useHistory();
    const proceed = () =>{
        localStorage.plannedDate = new Date().toISOString().split("T")[0]
        history.push("/task-for-today")
    }
    return (
        <div>
             <NavBar/>
            <h1 className="text-6xl  text-sky-500 text-center font-bold">Tentative&nbsp;Tasks</h1>
            {/* <AddTask/> */}
            {/* <React.StrictMode> */}
            {/* <Popup trigger={<button className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-[42px] ml-[950px] fixed">&nbsp;Create New Task&nbsp;</button>}  >
                <AddTask/>
            </Popup> */}
            
              <Tasks title = 'Modify'/>
                <AddTask/>
                <input onClick={proceed} className="fixed ml-[1000px] mt-[-10px] transition ease-in-out delay-50 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 duration-200  text-center text-white font-bold w-[280px] h-[35px] rounded-md drop-shadow-xl rounded-full visible" type="button" value="Proceed with planned tasks" />    
               
            {/* </React.StrictMode> */}
           
        </div>
    );
}
export default TentativeTodo;