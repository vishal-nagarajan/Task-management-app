import React, { useState,useEffect } from "react";
import AddProject from "./AddProject"
import AddClient from "./AddClient"
import ViewProjects from "./ViewProjects"
import ViewClients from "./ViewClients"
import Swal from "sweetalert2"
import ip from "./../../src/serverIp.json";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import ToggleButton from 'react-toggle-button';
const UpdateWork = (taskInfo) => {
    let history = useHistory();
    const [tasks, SetTasks] = useState([]);
    const [toggle, SetToggles] = useState([false]);
    useEffect(() => {
        getTaskData()
    
    }, [])

    console.log(taskInfo.match.params.taskId)
    var work = Object();
    const useDataBind = () => {
        const [value, setVal] = useState("")
        const onChange = (e) => setVal(e.target.value)
        return { value, onChange }
    }
    const workStartTime = useDataBind()
    const workEndTime = useDataBind()
    const placeOfWork = useDataBind()
    const peopleAtWork = useDataBind()
    const natureOfWork = useDataBind()
    const status = useDataBind()
    const task = useDataBind()

    const getTaskData = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("userId", localStorage.userId);
        myHeaders.append("Authorization", "Bearer "+ localStorage.JWTToken);
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch(ip.serverIp+"/task/task/"+taskInfo.match.params.taskId, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(responseObject =>{
            SetTasks(responseObject)
        })
        .catch(error => console.log('error', error));
    }
    

    const save = () => {
    work.workStartTime = workStartTime.value 
    work.workEndTime = workEndTime.value 
    work.placeOfWork = placeOfWork.value 
    work.peopleAtWork = peopleAtWork.value 
    work.natureOfWork = natureOfWork.value 
    work.task = taskInfo.match.params.taskId
    // work.status = status.value 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.JWTToken);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(work),
    redirect: 'follow'
    };

    fetch(ip.serverIp+"/work", requestOptions)
    .then(response => response.text())
    .then(result =>{
        history.push("/task-for-today")
        Swal.fire({
            icon: 'success',
            title: 'Work log for '+tasks.title+' saved successfully',
            text: toggle.value?'Task status : Completed':'Task status : Inprogress',
            showConfirmButton: false,
            timer: 1000
          }).then(()=>{
            
          })
        
    })
    .catch(error => console.log('error', error));
        work.task = task.value 
        console.log(work)

    if (toggle.value){
        console.log(toggle)
        myHeaders.append("taskId",taskInfo.match.params.taskId);
        
        requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(ip.serverIp+"/task/update/status", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    }
    return (
        <div>
                <NavBar/>
            <h1 className="text-6xl  text-sky-500 text-center font-bold">Log&nbsp;Work</h1>
            <form className="fixed left-[500px]  z-50 " >
                <h1 className={"border-blue-200 block mr-auto ml-auto indent-[10px] font-semibold w-[445px] h-[40px] mt-10  drop-shadow-xl border-t-2 border-x-2 rounded-t-lg "} type="text" id="addtask" name="addtask" placeholder="Add New Task" > 
                {tasks.title}</h1>
                <div className="border-b-2 border-x-2 border-blue-200 w-[445px] h-[300px] bg-white block mr-auto ml-auto drop-shadow-xl rounded-b-lg   transition ease-in-out delay-150 duration-700 visible ">
                    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
                        <div className="absolute  mt-2 ">Start time</div>
                        {/* <TimePicker  className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md "  {...workStartTime}/> */}
                        <input {...workStartTime} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="start-date" name="start-date" type="datetime-local" />
                    </div>
                    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
                        <div className="absolute  mt-2 ">End time</div>
                        <input {...workEndTime} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="end-date" name="end-date" type="datetime-local" />
                    </div>
                    <input type="text" id="place" name="place" placeholder="place" className={"indent-[10px] w-[440px] h-[40px] block mr-auto ml-auto  font-sm"} {...placeOfWork} />
                    <input type="text" id="people" name="people" placeholder="people" className={"indent-[10px] w-[440px] h-[40px] block mr-auto ml-auto  font-sm"} {...peopleAtWork} />
                    <input type="text" id="natureOfWork" name="natureOfWork" placeholder="Nature Of Work" className={"indent-[10px] w-[440px] h-[40px] block mr-auto ml-auto  font-sm"} {...natureOfWork} />
                    <label className="ml-[10px]">Mark task completed</label>

                        <ToggleButton className = "ml-[100px]"
                            value={ toggle.value || false }
                            onToggle={(value) => {
                                SetToggles({
                                value: !value,
                                })
                        }} />


                    <div className="w-[80px] h-[25px] text-center text-white font-bold   mr-10 ml-auto rounded-full " id="save">
                        <input  className={"fixed transition ease-in-out delay-150 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 duration-300  text-center text-white font-bold w-[80px] h-[25px] rounded-md drop-shadow-xl rounded-full ml-[-15px]" } type="button" value="Save" onClick={save} />
                        <input  className={"fixed  transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-red-400 duration-300 text-center text-white font-bold w-[80px] h-[25px] rounded-md bg-red-600  drop-shadow-xl rounded-full  ml-[-100px]" } type="button" value="Cancel" />
                    </div>
                </div>
        </form>
        </div>
    )

}
export default UpdateWork;