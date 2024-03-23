import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import '../css/sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Function to handle sign-out
  const handleSignOut = async () => {
    // Check if freelancer is logged in based on cookies
    const userType = getCookie('userType');
    if (userType==='freelancer'){
      try {
        const response = await fetch('http://localhost:3000/api/v1/Freelancer/logout', {
          method: 'GET',
          
        });

        if (response.ok) {
          console.log("Freelancer logged out successfully");
          clearCookie('token');
          clearCookie('freelancer');
          clearCookie('freelancerID');
          clearCookie('userType');
          window.location.href = '/';
        } else {
          console.error("Failed to log out freelancer");
        }
      } catch (error) {
        console.error("Error logging out freelancer:", error);
      }
      
    } else if (userType === 'company') {
      try {
        const response = await fetch('http://localhost:3000/api/v1/Company/logout', {
          method: 'GET',
          
        });

        if (response.ok) {
          console.log("Company logged out successfully");
          clearCookie('token');
          clearCookie('company');
          clearCookie('companyID');
          clearCookie('userType');
          window.location.href = '/';
        } else {
          console.error("Failed to log out company");
        }
      } catch (error) {
        console.error("Error logging out company:", error);
      }
    } else {
      console.log("No user logged in.");
    }
  };
  
  

  // Function to get cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <>
      <div className="parentSidebar">
        <h2 className="outsource text-center">OutsourcePro</h2>
        <div className="sidebar mt-4 ">
          <a className="sidebarLink my-lg-4 " href="#home">
            <IoMdHome className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />
            Home
          </a>
          <Link className="sidebarLink my-lg-4 " to="/CreateProject">
            <FaPeopleGroup className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />
            Projects
          </Link>
          <Link className="sidebarLink my-lg-4 " to="/AllProjects">
            <IoIosSettings className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />
            Settings
          </Link>
          <a className="sidebarLink my-lg-4 " href="#about">
            <MdContactSupport className="mx-3 mb-2" style={{ fontSize: 'x-large', color:'#6319B8'}} />
            About Us
          </a>
        </div>
        {/* Sign out button */}
   
      <button className="signOutButton " onClick={handleSignOut}>
          Sign Out
        </button>
     
      </div>
    </>
  );
};

export default Sidebar;
