import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Catalog() {

  const[visible,setVisible]=useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left text-[16px]"  onMouseOver={()=>setVisible(true)}   >
      <div>
        <Menu.Button className="inline-flex w-full justify-center text-base rounded-md  px-3     font-inter text-gray-900 shadow-sm "   >
          Catalog
          <ChevronDownIcon className="-mr-1 mt-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>
      { visible && 
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
         <Menu.Items className={` absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-richblack-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={'/catalog/python'}
                  className={classNames(
                    active ? 'bg-richblack-25 text-richblack-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                 )}
                >
                  Python
                </Link>
              )}
            </Menu.Item>
            <Menu .Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-richblack-25 text-richblack-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Web Dev
                </a>
              )}
            </Menu.Item>
            
            
          </div>
        </Menu.Items>
      </Transition>}
    </Menu>
  )
}
