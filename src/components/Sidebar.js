import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import '../css/sidebar.css'


const Sidebar = () => {
  return (
    <>
  
    <div className="parentSidebar">
      <h2 className="outsource">OutsourcePro</h2>
      <div className="sidebar mt-4">
        <a className="sidebarLink" href="#home"><IoMdHome className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />Home</a>
        <a className="sidebarLink" href="#news"><FaPeopleGroup className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />Projects</a>
        <a className="sidebarLink" href="#contact"><IoIosSettings className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}}/>Settings</a>
        <a className="sidebarLink" href="#about"><MdContactSupport className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}}/>About Us</a>
      </div>
    </div>
    
  
</>

  );
};

export default Sidebar;
