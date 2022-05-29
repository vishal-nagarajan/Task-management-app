import Swal from "sweetalert2"
import React, { useState } from "react";
import { PencilIcon } from '@heroicons/react/solid'
import ip from "./../../src/serverIp.json";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {flatpickr, flatpickrInstance} from 'flatpickr/dist/flatpickr.min';

const ModifyTask=(taskId)=>{
    let history = useHistory()
    const useDataBind = () => {
        const [value, setVal] = useState("")
        
        const onChange = (e) => setVal(e.target.value)
        return { value, onChange }
    }
    const editTask =()=>{
        console.log(taskId.taskId,"inside")
        history.push("/task/edit/"+taskId.taskId.taskId)
    }
    const startDate = useDataBind()
    const modifyTask = async () =>{
        console.log(taskId.flow,"option")
        if (taskId.taskId.flow === "Update"){
            editTask()
            return
        }

        console.log(taskId)
    Swal.fire({
        title: 'Modify start date for the selected task',
        html: ' <input class="swal2-input" id="date" type="date" placeholder="date" />', 
        stopKeydownPropagation: false,
        confirmButtonText:'Modify start date',
        preConfirm: function() {
            return new Promise((resolve, reject) => {
                // get your inputs using their placeholder or maybe add IDs to them
                resolve({
                    modifiedDate: Swal.getPopup().querySelector('#date').value
                });

                // maybe also reject() on some condition
            });
        }
    }).then((data) => {
        // your input data object will be usable from here
        console.log(data);
        startDate.value = data.value.modifiedDate
        console.log(startDate.value);
        var myHeaders = new Headers();
        myHeaders.append("startDate", startDate.value);
        myHeaders.append("taskId", taskId.taskId);
        myHeaders.append("Authorization", "Bearer "+localStorage.JWTToken)
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(ip.serverIp+"/task/update/start-date", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        
    });
    }
return(
    <button onClick={modifyTask} className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-1 " >
        <PencilIcon className="h-5 w-5 text-white group-hover:text-blue-100" aria-hidden="true"/>
       </button>
  
)
}
export default ModifyTask;