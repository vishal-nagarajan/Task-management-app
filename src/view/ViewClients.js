import React, { useState,useEffect } from "react";
import ip from "./../../src/serverIp.json";
const ViewClients = () => {
    useEffect(() => {
        apiLoad()
    }, [])
    const [clients, SetClients] = useState([])
    const apiLoad = () => {
        var myHeaders = new Headers();
        myHeaders.append("UserId", localStorage.userId);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(ip.serverIp+"/client/list", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result).responseObject)
            .then(obj => {
                if (obj !== null) {
                    SetClients(obj)
                }
                console.log(obj)
            })

            .catch(error => console.log('error', error));
    }
    const populatOptions = () => {
        return (clients.map(function (client, i) {
            console.log(client)
            return (<option
                key={client.clientId}
                value={client.clientId}>
                {client.client}
            </option>)
        }))
    }

    return (
        populatOptions()
    )
}

export default ViewClients;