import React from 'react'
import { TiInfoLargeOutline } from "react-icons/ti";
import { IoSettings } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { GiQueenCrown } from "react-icons/gi";
import {MdOutlineCircleNotifications } from "react-icons/md";
function NavBar() {
  return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="ml-4 btn btn-ghost text-xl">TypeGram</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 gap-5 mr-4 text-2xl">
        <li><a><GiQueenCrown/></a></li>
        <li><a><MdOutlineCircleNotifications/></a></li>
      <li><TiInfoLargeOutline /></li>
      <li><a><IoSettings/></a></li>
      <li><a><IoMdPerson/></a></li>
    </ul>
  </div>
</div>
  )
}

export default NavBar