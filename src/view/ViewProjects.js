import React, { useState ,useEffect } from "react";
import ip from "./../../src/serverIp.json";
const ViewProjects = () => {
    useEffect(() => {
        apiLoad()
    }, [])
    const [projects, SetProjects] = useState([])
    const apiLoad = () => {
        var myHeaders = new Headers();
        myHeaders.append("UserId", localStorage.userId);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(ip.serverIp+"/project/list", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result).responseObject)
            .then(obj => {
                if (obj !== null) {
                    SetProjects(obj)
                }
                console.log(obj)
            })

            .catch(error => console.log('error', error));
    }
    const populatOptions = () => {
        return (projects.map(function (project, i) {
            return (<option
                key={project.projectId}
                value={project.projectId}>
                {project.project}
            </option>)
        }))
    }

    return (
        populatOptions()
    )
}

export default ViewProjects;