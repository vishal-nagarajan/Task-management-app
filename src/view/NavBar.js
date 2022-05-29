/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom";

const navigation = [
  { name: 'Tasks', href: '/task/all', current: false },
  { name: 'Completed tasks', href: '/task/completed', current: false },
  { name: 'Tasks in progress', href: '/task/task-in-progress', current: false },
  { name: 'Task Over due', href: '/task/task-over-due', current: false },
  { name: 'Task Yet to be due', href: '/task/task-yet-to-be-due', current: false },
  { name: 'Work Log', href: '/task/work-log', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  let history = useHistory();
  const changeCurrent=(item)=>{
    console.log(window.location.href.split("/")[4],"item", navigation[1].href.split("/")[2])
    for (let nav in navigation){
      if (navigation[nav].href.split("/")[2] === window.location.href.split("/")[4]){
       navigation[nav].current = true
      } else {
        navigation[nav].current = false
      }
    }
  }
  const routeToTodo = ()=>{
    history.push("/task-for-today")
  }

  const signout = async ()  => {
    let timerInterval
    Swal.fire({
      title: 'Signout',
      html: 'Securely signing you out of Task App',
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      localStorage.removeItem("userId")
    localStorage.removeItem("JWTToken")
    localStorage.removeItem("plannedDate")
    history.push("/signup")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your have been successfully logged out of Task App!',
      showConfirmButton: false,
      timer: 1500
    })
    })
    

  }

  return (
    <Disclosure as="nav" className="bg-sky-400">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center text-white text-xl cursor-pointer" onClick={routeToTodo}>
                    <b>Task App</b>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4" >
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-sky-700 text-white' : 'text-black hover:bg-sky-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://ethelartconnect.store/wp-content/uploads/2021/01/profile.jpg"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/homepage"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            About us
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <b> Sign out</b>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel >
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              {navigation.map((item) => (
               
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={changeCurrent()}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}