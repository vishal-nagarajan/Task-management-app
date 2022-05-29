
import { LockClosedIcon } from '@heroicons/react/solid'
import React, { useState } from "react";
import ip from "./../../src/serverIp.json";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2"
const Register=()=>{
    var user = Object();
    let history = useHistory();
    const useDataBind = () => {
        const [value, setVal] = useState("")
        const onChange = (e) => setVal(e.target.value)
        return { value, onChange }
    }
    const email = useDataBind()
    const password = useDataBind()
    const name = useDataBind()
    const createUser = ()=>{
      var myHeaders = new Headers();
myHeaders.append("userName", user.email);
myHeaders.append("Authorization", "Bearer "+ localStorage.JWTToken);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'manual'
};

fetch(ip.serverIp+"/user", requestOptions)
  .then(response => response.text())
  .then(result => JSON.parse(result))
  .then(responseObject =>{
    Swal.fire({
      title: 'Sign Up successful',
      html: 'Finisihing Onboarding and user profile in Task App',
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(1000)
      }
    }).then((result) => {
      localStorage.userId = responseObject.id
      history.push("/tentative-tasks");
      Swal.fire({
        icon: 'success',
        title: 'You have been successfully signed up for Task App',
        showConfirmButton: false,
        timer: 1500
      })
    })
  })
    }
    const register = ()=>{
        user.email = email.value
        user.password = password.value
        user.name = name.value
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "email": user.email,
        "password": user.password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
        };

        fetch(ip.serverIp+"/api/auth/register", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
          .then(responseObject =>{
            console.log(responseObject.status)
            if (responseObject.status === 'SUCCESS')
              localStorage.JWTToken = responseObject.responseObject["jwt-token"]
              createUser();
          })
        .catch(error => console.log('error', error));
    }
    return(
        // <form className="fixed left-[500px]">
        //    <input type="email" id="email" name="email" placeholder="email" {...email}></input>
        //    <input type="password" id="password" name="password" placeholder="password" {...password}></input>
        //    <input onClick={register}  type="submit" value="register" ></input>
        // </form>
        <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for a new Account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                
                <a href="/signin" className="font-medium text-sky-500 hover:text-sky-400">
                  Sign in with existing account
                </a>
              </p>
            </div>
            {/* <form className="mt-8 space-y-6" onsubmit=""> */}
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">

              <div>
                  <label htmlFor="text" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="email"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    {...name}
                  />
                </div>

                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    {...email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    {...password}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Re-Enter Password
                  </label>
                  <input
                    id="re-password"
                    name="re-password"
                    type="password"
                    autoComplete="re-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Re-Enter Password"
                  />
                </div>
              </div>
  
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
  
                {/* <div className="text-sm">
                  <a href="#" className="font-medium text-sky-400 hover:text-sky-500">
                    Forgot your password?
                  </a>
                </div> */}
              </div>
  
              <div>
                <button
                  onClick={register}
                
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-sky-500 group-hover:text-sky-400" aria-hidden="true" />
                  </span>
                  Sign up
                </button>
              </div>
            {/* </form> */}
          </div>
        </div>
      </>

    )
}
export default Register;