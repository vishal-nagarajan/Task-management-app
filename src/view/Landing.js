import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { ArrowCircleDownIcon } from '@heroicons/react/solid'
import { useHistory } from "react-router-dom";

const Landing = () =>{
    let history = useHistory();
    const signup = () =>{
        history.push("/signup")
    }

    return(
        <ReactFullpage 

    //fullpage options
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {1000} /* Options here */
    scrollHorizontally = {true}  /* Because we are using the extension */
    scrollHorizontallyKey = {'YOUR KEY HERE'}

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className=" section bg-gradient-to-r from-sky-200 to-sky-700 grid grid-cols-1 gap-2 place-content-center  h-screen">
            <div className='ml-[200px] bg-white w-[1000px] h-[400px]  drop-shadow-2xl	rounded-3xl'>
                <p className='fixed text-sky-600 ml-[50px] mt-[160px] font-bold text-6xl'> 
                Task App 
                </p>
                <ol className='  ml-[450px] mr-[30px] mt-[30px]  text-xl'>
                &nbsp;&nbsp;&nbsp;&nbsp;<li>A one stop task management solution that helps a user to add, classify, schedule and manage tasks and generate a work log based on tasks completed.</li>
                &nbsp;&nbsp;&nbsp;&nbsp;<li>This Application is specifically built for Freelancers/Project Managers who work on multiple projects for multiple clients at any point of time.</li>
                </ol>
                <button
                onClick={signup}
                  className="group fixed ml-[450px]  mt-[50px] flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleRightIcon className="h-5 w-5 text-green-500 group-hover:text-white justify-right" aria-hidden="true" />
                  </span>
                  Sign up & try
                </button>
                <button onClick={() => fullpageApi.moveSectionDown()}
                  className="group fixed ml-[800px]  mt-[50px] flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleDownIcon className="h-5 w-5 text-yellow-500 group-hover:text-white justify-right" aria-hidden="true" />
                  </span>
                  Read more
                </button>
            </div>
            {/* <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
            </button> */}
          </div>
          <div className="section bg-sky-500 h-screen">
          <div className='ml-[200px] bg-white w-[1000px] h-[400px]  drop-shadow-2xl	rounded-3xl'>
            <img src='../../taskwords.png' className='w-[450px] absolute rounded-3xl ' ></img>
            <ol className='  ml-[450px] mr-[30px] mt-[30px]  text-xl'>
               <li><i><b>Too much tasks and unable to plan your day ?</b></i>
                </li>
                <li>  &nbsp;&nbsp;&nbsp;&nbsp; </li>
                <li> With task app you can create tasks with different start date and end date for specified clients and projects. We list the tasks based on the start date and completion status.You can easily plan your day from there</li>
                </ol>
          <button onClick={() => fullpageApi.moveSectionDown()}
                  className="group fixed ml-[800px]  mt-[50px] flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleDownIcon className="h-5 w-5 text-yellow-500 group-hover:text-white justify-right" aria-hidden="true" />
                  </span>
                  Read more
                </button>
          </div>
          
          </div>
          <div className="section bg-sky-600 h-screen" >
          <div className='ml-[200px] bg-white w-[1000px] h-[400px]  drop-shadow-2xl	rounded-3xl'>
          <img src='../../report.png' className='w-[300px] absolute rounded-3xl ml-[60px] mt-[60px]' ></img>
          <ol className='  ml-[450px] mr-[30px] mt-[80px]  text-xl'>
               <li><i><b>Improve productivity and deadline estimation with reports</b></i>
                </li>
                <li>  &nbsp;&nbsp;&nbsp;&nbsp; </li>
                <li>In task app you can generate report for all the tasks and their respective worklogs</li>
                </ol>
                <button
                onClick={signup}
                  className=" animate-pulse group h-[40px] w-[500px] fixed ml-[450px]  mt-[50px] flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleRightIcon className="  h-5 w-5 text-green-500 group-hover:text-white justify-right" aria-hidden="true" />
                  </span>
                  Sign up & try
                </button>
            </div>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
    )
}

export default Landing;