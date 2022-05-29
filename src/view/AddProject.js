import Swal from "sweetalert2"
import ip from "./../../src/serverIp.json";
const AddProject =()=>{
    const addProject = async () =>{
    const { value: project } = await Swal.fire({
        title: 'Add New Project',
        input: 'text',
        inputLabel: 'Project Name',
        inputPlaceholder: 'Enter new project name'
      })
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "project": project,
          "userId":localStorage.userId
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch(ip.serverIp+"/project", requestOptions)
          .then(response => response.text())
          .then(result => JSON.parse(result).status)
          .then(status =>{
              if (status === 'SUCCESS'){
                Swal.fire(
                    'Successfully added new project',
                    project,
                    'success'
                )
              }else if( status === 'PROJECT_ALREADY_EXISTS'){
                Swal.fire(
                    'Project '+project+' already exists!',
                    'Try another project name',
                    'warning'
                )
              }
          })
          .catch(error => {
            Swal.fire(
                'Failed to add new Project',
                '',
                'error'
            )
            console.log('error', error)
            });
    }
return(
    <input onClick={addProject} className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-2 ml-[270px] " type="button" value="Add New Project" />
)
}
export default AddProject;