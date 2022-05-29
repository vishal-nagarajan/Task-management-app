import { ViewGridAddIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Popup from 'reactjs-popup';
import UpdateWork from './UpdateWork';
const UpdateTask =(info)=>{
    let history = useHistory()
    const updateWorkForTask =()=>{
        console.log(info.taskId)
        history.push("/task/work/"+info.taskId)
    }
    return(
        <button onClick={updateWorkForTask} className=" cursor-pointer p-1 rounded-md bg-sky-500 text-white font-bold mt-1 " >
                <ViewGridAddIcon className="h-5 w-5 text-white group-hover:text-blue-100" aria-hidden="true"/>
            </button>
    )
}
export default UpdateTask;