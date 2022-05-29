import AddClient from "./AddClient";
import AddProject from "./AddProject";
import AddTask from "./AddTask";
import NavBar from "./NavBar";
import ViewClients from "./ViewClients";
import React, { useState,useEffect } from "react";
import ip from "./../../src/serverIp.json";
import Swal from "sweetalert2"

const EditTask = (option) =>{
    const [tasks, SetTasks] = useState([]);
    var task = Object();
    const useDataBind = () => {
        const [value, setVal] = useState("")
        const onChange = (e) => setVal(e.target.value)
        return { value, onChange }
    }
    useEffect(() => {
        getTaskData()
    
    }, [])
    const title = useState
    const description = useDataBind()
    const project = useDataBind()
    const client = useDataBind()
    const startDate = useDataBind()
    const endDate = useDataBind()
    const save = () => {
        task.title = title.value
        task.description = description.value
        task.project = project.value
        task.client = client.value
        task.startDate = startDate.value
        task.endDate = endDate.value
        var myHeaders = new Headers();
        myHeaders.append("userId", localStorage.userId);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+localStorage.JWTToken);
        var raw = JSON.stringify({
            "title": title.value,
            "description": description.value,
            "project": Number(project.value),
            "client": Number(client.value),
            "startDate": tasks.startDate,
            "endDate": tasks.endDate,
            "userId":Number(localStorage.userId)
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(ip.serverIp+"/task", requestOptions)
        .then(response => response.text())
            .then(response =>{
                Swal.fire(
                    'Successfully added new task',
                    title.value,
                    'success'
                )
            })
            .catch(error => console.log('error', error));
    }

    const populateFields = () => {

    }
    const getTaskData = ()=>{
        var myHeaders = new Headers();
       
        myHeaders.append("userId", localStorage.userId);
        myHeaders.append("Authorization", "Bearer "+ localStorage.JWTToken);
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch(ip.serverIp+"/task/task/"+option.match.params.taskId, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(responseObject =>{
            SetTasks(responseObject)
            
        }).then(()=>{
            populateFields()
        })
        .catch(error => console.log('error', error));
    }

    return(
        <div>
        <NavBar/>
        <h1 className="text-6xl  text-sky-500 text-center font-bold">Edit Task</h1>
        <form className="fixed left-[500px]  z-50">

<input  className={"border-blue-200 block mr-auto ml-auto indent-[10px] font-semibold w-[445px] h-[40px] mt-10  drop-shadow-xl  border-t-2 border-x-2 rounded-t-lg"} type="text" id="addtask" name="addtask" placeholder="Add New Task" defaultValue={tasks.title} {...title}/>
<div className={"border-b-2 border-x-2 border-blue-200 w-[445px] h-[280px] bg-white block mr-auto ml-auto drop-shadow-xl rounded-b-lg  transition ease-in-out delay-150 duration-700 visible "} >
    <input type="text" id="description" name="description" placeholder="description" className={"indent-[10px] w-[440px] h-[40px] block mr-auto ml-auto  font-sm"} value={tasks.description} />
    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
        <div className="absolute  mt-2 ">Project</div>
        <select value={tasks.project} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="project" name="project">
            <ViewClients />
        </select>
        <AddProject />
        {/* <input className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-2 ml-[270px] " type="button" value="Add New Project" /> */}
    </div>
    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
        <div className="absolute  mt-2 ">Client</div>
        <select {...client} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="client" name="client">
            <ViewClients />
        </select>
        <AddClient />
        {/* <input className="p-1 cursor-pointer rounded-md bg-sky-500 text-white font-bold mt-2 ml-[270px] " type="button" value="Add New Client" /> */}
    </div>
    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
        <div className="absolute  mt-2 ">Start Date</div>
        <input value={new String(tasks.startDate).substr(0,10)} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="start-date" name="start-date" type="date" />
    </div>
    <div className="indent-[10px] font-sm w-[440px] h-[50px] bg-white block mr-auto ml-auto ">
        <div className="absolute  mt-2 ">End Date</div>
        <input value={new String(tasks.endDate).substr(0,10)} className="absolute w-[180px] ml-20 mt-2 border border-blue-200 rounded-md " id="end-date" name="end-date" type="date" />
    </div>
    <div className="w-[80px] h-[25px] text-center text-white font-bold   mr-10 ml-auto rounded-full " id="save">
        <input onClick={save} className={"fixed transition ease-in-out delay-150 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 duration-300  text-center text-white font-bold w-[80px] h-[25px] rounded-md drop-shadow-xl rounded-full ml-[-15px]" } type="button" value="Save" />
        <input  className={"fixed  transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-red-400 duration-300 text-center text-white font-bold w-[80px] h-[25px] rounded-md bg-red-600  drop-shadow-xl rounded-full  ml-[-100px]"} type="button" value="Cancel" />
    </div>
</div>
</form>
</div>
    )
}

export default EditTask;