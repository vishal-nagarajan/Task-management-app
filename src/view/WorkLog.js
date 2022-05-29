import NavBar from "./NavBar";
import ip from "../serverIp.json"
import React, { useState } from "react";

const WorkLog =() =>{
    const useDataBind = () => {
        const [value, setVal] = useState("")
        const onChange = (e) => setVal(e.target.value)
        return { value, onChange }
    }
    const fileName = useDataBind()
    const generate = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("userId", localStorage.userId);
        myHeaders.append("fileName", fileName.value);
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBdXRoVXNlciBEZXRhaWxzIiwiaXNzIjoiWU9VUiBBUFBMSUNBVElPTi9QUk9KRUNUL0NPTVBBTlkgTkFNRSIsImlhdCI6MTY1MjE1MzQzMywiZW1haWwiOiJ2aXNoYWxAZ21haWwuY29tIn0.I2jzyyUmn8rREDKS3FARHPd00zogUcjhkbhMH-TjYos");
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(ip.serverIp+"/work/generate", requestOptions)
        .then(response => response.blob())
        .then(result => {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            var url = window.URL.createObjectURL(result);
            a.href = url;
            a.download = fileName.value;
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.log('error', error));
    }

    return(
        <div>
            <NavBar/>
            <h1 className="text-6xl  text-sky-500 text-center font-bold">Generate WorkLog</h1>
            <input  className={"border-blue-200 block mr-auto ml-auto indent-[10px] font-semibold w-[445px] h-[40px] mt-10  drop-shadow-xl border-t-2 border-x-2 border-y-2 rounded-lg "} type="text" id="addtask" name="addtask" placeholder="File name" {...fileName} />
            <input  className={" block mr-auto ml-auto mt-[20px] ease-in-out delay-150 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 duration-300  text-center text-white font-bold w-[100px] h-[25px] rounded-md drop-shadow-xl rounded-full "} type="button" value="Generate" onClick={generate} />
        </div>
    )
}
export default WorkLog;