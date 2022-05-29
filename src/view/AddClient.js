import Swal from "sweetalert2"
import ip from "./../../src/serverIp.json";
const AddClient =()=>{
    const addClient = async () =>{
    const { value: client } = await Swal.fire({
        title: 'Add New Client',
        input: 'text',
        inputLabel: 'Client Name',
        inputPlaceholder: 'Enter new client name'
      })
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "client": client,
          "userId": localStorage.userId
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch(ip.serverIp+"/client", requestOptions)
          .then(response => response.text())
          .then(result => JSON.parse(result).status)
          .then(status =>{
              if (status === 'SUCCESS'){
                Swal.fire(
                    'Successfully added new project',
                    client,
                    'success'
                )
              }else if( status === 'CLIENT_ALREADY_EXISTS'){
                Swal.fire(
                    'Client '+client+' already exists!',
                    'Try another client name',
                    'warning'
                )
              }
          })
          .catch(error => {
            Swal.fire(
                'Failed to add new Client',
                '',
                'error'
            )
            console.log('error', error)
            });
    }
return(
    <input onClick={addClient} className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-2 ml-[270px] " type="button" value="Add New Client" />
)
}
export default AddClient;